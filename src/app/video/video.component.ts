import { Component, OnInit } from '@angular/core';
import { VideoService } from '../shared/services/video.service';
import { Video } from '../shared/models/video.model';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  videos: Video[];
  embedVideos: string[] = [];

  constructor(private videoService: VideoService) { }

  ngOnInit(): void {
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
  }

}
