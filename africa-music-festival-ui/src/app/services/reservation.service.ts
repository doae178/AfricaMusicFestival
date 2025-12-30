// src/app/services/reservation.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReservationService {

  private apiUrl = 'http://localhost:8081/api/reservations';

  constructor(private http: HttpClient) {}

  // ✅ clientId OBLIGATOIRE
  createReservation(payload: any, clientId: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}?clientId=${clientId}`,
      payload
    );
  }

  confirmReservation(id: number): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}/confirm`,
      {}
    );
  }
}
