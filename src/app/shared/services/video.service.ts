import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Video } from '../models/video.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) { }

  getAll():Observable<Video[]> {
    return this.http.get<Video[]>(`${environment.APIURI}videos`);
  }

  post(video: Video): Observable<Video> {
    return this.http.post<Video>(`${environment.APIURI}videos`, video);
  }
}
