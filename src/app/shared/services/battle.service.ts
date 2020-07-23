import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Battle } from '../models/battle.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Battle[]> {
    return this.http.get<Battle[]>(`${environment.APIURI}battles`);
  }

  post(battle: Battle): Observable<Battle> {
    return this.http.post<Battle>(`${environment.APIURI}battles`, battle);
  }
}
