import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  youtubePath = 'https://www.googleapis.com/youtube/v3/videos?id=';

  constructor(private http: HttpClient) { }

  getYoutubeVideoData(id: string): Observable<any> {
    return this.http.get(`${this.youtubePath}${id}&key=${environment.APIKEY}&part=snippet,statistics`);
  }
}

