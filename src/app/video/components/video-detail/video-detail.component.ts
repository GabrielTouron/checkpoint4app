import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/shared/services/video.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Video } from 'src/app/shared/models/video.model';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent implements OnInit {

  videoId: number;
  video: Video;
  embedLink: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private videoService: VideoService
  ) { }

  ngOnInit(): void {
    this.getRouteParamInitVideo();
  }

  getRouteParamInitVideo() {
     this.route.paramMap.subscribe(params => {
      if (params) {
        const routeVideoId = Number(params.get('id'));
        this.videoId = routeVideoId;
        this.videoService.getOne(this.videoId).subscribe((video) => {
          if (video) {
            this.video = video;
            this.embedLink = video.ytLink.replace('https://www.youtube.com/', 'https://www.youtube.com/embed/').replace('watch?v=', '');

          }
        });
      }
    });
  }

}
