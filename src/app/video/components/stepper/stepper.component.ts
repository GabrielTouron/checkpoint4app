import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StepService } from 'src/app/shared/services/step.service';
import { Step } from 'src/app/shared/models/step.model';
import { Battle } from 'src/app/shared/models/battle.model';
import { BattleService } from 'src/app/shared/services/battle.service';
import { ActivatedRoute } from '@angular/router';
import { YoutubeService } from 'src/app/shared/services/youtube.service';
import { Video } from 'src/app/shared/models/video.model';
import { VideoService } from 'src/app/shared/services/video.service';
import { Place } from 'src/app/shared/models/place.model';
import { PlaceService } from 'src/app/shared/services/place.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  steps: Step[];
  battles: Battle[];
  places: Place[];
  show = false;
  link: any;
  youtubeData: any;
  video = new Video();
  battle = new Battle();

  battleFormGroup: FormGroup;
  videoDetailsFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private stepService: StepService,
    private battleService: BattleService,
    private placeService: PlaceService,
    private activatedRoute: ActivatedRoute,
    private youtubeService: YoutubeService,
    private videoService: VideoService
  ) {
    this.activatedRoute.queryParams.subscribe(data => {
      this.link = data;
      this.getYoutubeData();
    });
   }

  ngOnInit(): void {
    this.initReactiveForm();
    this.getAllSteps();
    this.getAllBattles();
    this.getAllPlaces();
  }

  initReactiveForm() {
    this.battleFormGroup = this.formBuilder.group({
      battleNameCtrl: ['', Validators.required],
      editionCtrl: [],
      stepCtrl: [],
      priceCtrl: [],
      isWinnerCtrl: []
    });
    this.videoDetailsFormGroup = this.formBuilder.group({
      videoTitleCtrl: ['', Validators.required],
      commentaryCtrl: [{value: ''}],
      customCommentaryCtrl: [],
      placeCtrl: []
    });

  }

  getAllSteps() {
    this.stepService.getAll().subscribe((steps: Step[]) => {
      if (steps) {
        this.steps = steps;
      }
    });
  }

  getAllBattles() {
    this.battleService.getAll().subscribe((battles: Battle[]) => {
      if (battles) {
        this.battles = battles;
      }
    });
  }

  getAllPlaces() {
    this.placeService.getAll().subscribe((places: Place[]) => {
      if (places) {
        this.places = places;
      }
    });
  }

  showIsWinner($event: any) {
    if ($event.value === 1) {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  getYoutubeData() {
    this.youtubeService.getYoutubeVideoData(this.link.link.split('https://www.youtube.com/watch?v=')[1])
      .subscribe((youtubeData) => {
        if (youtubeData) {
          this.youtubeData = youtubeData;
          this.battleFormGroup.setValue({
            battleNameCtrl: this.youtubeData.items[0].snippet.title,
            editionCtrl: '',
            stepCtrl: '',
            priceCtrl: '',
            isWinnerCtrl: false
          });

          this.videoDetailsFormGroup.setValue({
            videoTitleCtrl: this.youtubeData.items[0].snippet.title,
            commentaryCtrl: this.youtubeData.items[0].snippet.description,
            customCommentaryCtrl: '',
            placeCtrl: ''
          });
        }
      });
  }

  save() {

    this.battle.name = this.battleFormGroup.value.battleNameCtrl;
    this.battle.edition = this.battleFormGroup.value.editionCtrl;
    this.battle.price = this.battleFormGroup.value.priceCtrl;

    this.battleService.post(this.battle).subscribe(response => {

      this.battle = response;
      if (this.battle.id) {

        const testVideo: Video = {
          videoTitle : this.videoDetailsFormGroup.value.videoTitleCtrl,
          commentary : this.videoDetailsFormGroup.value.commentaryCtrl,
          juryCommentary : this.videoDetailsFormGroup.value.customCommentaryCtrl,
          ytLink : this.link.link,
          isWinner : this.battleFormGroup.value.isWinnerCtrl,
          battle: {id: this.battle.id} as Battle,
          step: {id: this.battleFormGroup.value.stepCtrl} as Step,
          place: {id : this.videoDetailsFormGroup.value.placeCtrl} as Place
        };

        this.videoService.post(testVideo).subscribe();
      }

    });
  }

}
