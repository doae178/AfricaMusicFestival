import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FestivalEvent } from '../models/event.model';

@Injectable({ providedIn: 'root' })
export class EventService {

  private apiUrl = 'http://localhost:8081/api/events';

  constructor(private http: HttpClient) {}

  getAll(): Observable<FestivalEvent[]> {
    return this.http.get<FestivalEvent[]>(this.apiUrl);
  }

}
