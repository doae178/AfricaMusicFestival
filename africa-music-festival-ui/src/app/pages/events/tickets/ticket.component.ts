import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent {

  @Input() payment!: any;      // ✅ paiement
  @Input() reservation!: any;  // ✅ réservation

  print(): void {
    window.print();
  }
}
