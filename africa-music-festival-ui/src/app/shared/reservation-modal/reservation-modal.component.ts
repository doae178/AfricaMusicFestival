import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { CommonModule } from '@angular/common';
import { PaymentModalComponent } from '../../pages/events/payment/payment-modal.component';

@Component({
  selector: 'app-reservation-modal',
  standalone: true,
  imports: [CommonModule, PaymentModalComponent],
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.scss']
})
export class ReservationModalComponent {

  @Input() event!: any;
  @Output() close = new EventEmitter<void>();

  quantity = 1;
  loading = false;

  showPayment = false;
  reservationId!: number;

  // ⚠️ TEMPORAIRE (plus tard : user connecté)
  clientId = 1;

  get imageUrl(): string {
    return `assets/events/${this.event.id}.png`;
  }

  constructor(private reservationService: ReservationService) {}

  increase() {
    if (this.quantity < this.event.availableTickets) {
      this.quantity++;
    }
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  confirm() {
    this.loading = true;

    const payload = {
      eventId: this.event.id,
      customerName: 'Douae',
      customerEmail: 'douae@example.com',
      numberOfTickets: this.quantity
    };

    this.reservationService
      .createReservation(payload, this.clientId)
      .subscribe({
        next: (res: any) => {
          console.log('Reservation OK', res);
          this.reservationId = res.id;
          this.loading = false;
          this.showPayment = true;
        },
        error: (err) => {
          console.error('Reservation error', err);
          this.loading = false;
          alert('Erreur réservation');
        }
      });
  }

  onPaymentSuccess() {
    this.event.availableTickets -= this.quantity;
    this.close.emit();
  }
}
