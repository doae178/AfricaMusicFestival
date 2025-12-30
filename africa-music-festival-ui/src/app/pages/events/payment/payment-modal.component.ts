import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { PaymentService } from '../../../services/payement.service';

@Component({
  selector: 'app-payment-modal',
  standalone: true,
  imports: [FormsModule, CommonModule, DatePipe], // ✅ DatePipe ajouté
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
})
export class PaymentModalComponent {

  /* ===== INPUT / OUTPUT ===== */

  @Input() reservationId!: number;
  @Input() amount!: number;

  @Output() close = new EventEmitter<void>();

  /* ===== FORM ===== */

  cardNumber = '';
  expiry = '';
  cvc = '';

  loading = false;
  paid = false;
  error = '';

  /* ===== TICKET ===== */

  paymentResult: any = null;
  showTicket = false;

  ticketFields = [
    { label: 'Réservation', key: 'reservationId', suffix: '' },
    { label: 'Montant', key: 'amount', suffix: ' €' },
    { label: 'Statut', key: 'status', suffix: '' },
    { label: 'Date', key: 'paymentDate', suffix: '' }
  ];

  constructor(
    private paymentService: PaymentService,
    private cdr: ChangeDetectorRef
  ) {}

  /* ===== VALIDATION ===== */

  isFormValid(): boolean {
    return (
      this.cardNumber.replace(/\s/g, '').length === 16 &&
      /^\d{2}\/\d{2}$/.test(this.expiry) &&
      /^\d{3}$/.test(this.cvc)
    );
  }

  /* ===== PAYMENT ===== */

  pay(): void {
    console.log('CLICK PAY');

    if (!this.isFormValid()) {
      this.error = 'Informations de carte invalides';
      this.cdr.detectChanges();
      return;
    }

    this.loading = true;
    this.error = '';
    this.cdr.detectChanges();

    this.paymentService
      .pay(this.reservationId, this.amount)
      .subscribe({
        next: (payment) => {
          console.log('PAYMENT OK', payment);

          this.loading = false;
          this.paid = true;
          this.paymentResult = payment;
          this.showTicket = true;

          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('PAYMENT ERROR', err);

          this.loading = false;
          this.error = 'Paiement refusé';
          this.cdr.detectChanges();
        }
      });
  }

  /* ===== ACTIONS ===== */

  closeModal(): void {
    this.close.emit();
  }

  print(): void {
    window.print();
  }
}
