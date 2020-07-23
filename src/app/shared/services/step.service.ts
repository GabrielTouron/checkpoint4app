import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Step } from '../models/step.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StepService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Step[]> {
    return this.http.get<Step[]>(`${environment.APIURI}steps`);
  }
}
