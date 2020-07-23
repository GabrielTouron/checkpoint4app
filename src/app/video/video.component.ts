import { Component, OnInit, OnDestroy } from '@angular/core';
import { VideoService } from '../shared/services/video.service';
import { Video } from '../shared/models/video.model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, OnDestroy {

  videos: Video[];
  embedVideos: string[] = [];
  navigationSubscription: any;

  constructor(
    private videoService: VideoService,
    private router: Router
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
   }

  ngOnInit(): void {
  }

  initialiseInvites() {
    this.getAllVideos();
  }

  getAllVideos() {
    this.videoService.getAll().subscribe((videos: Video[]) => {
      if (videos) {
        this.videos = videos;
        this.videos.forEach(
          video => this.embedVideos.push(video.ytLink.replace('https://www.youtube.com/', 'https://www.youtube.com/embed/').replace('watch?v=', '')
        ));
      }
    });
    console.log('ok');
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
       this.navigationSubscription.unsubscribe();
    }
  }

}
