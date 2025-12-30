import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaymentService {

  private apiUrl = 'http://localhost:8081/api/payments';

  constructor(private http: HttpClient) {}

  pay(reservationId: number, amount: number): Observable<any> {
    return this.http.post(this.apiUrl, {
      reservationId,
      amount
    });
  }
}
