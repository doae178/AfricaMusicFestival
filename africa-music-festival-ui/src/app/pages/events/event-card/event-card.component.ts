import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FestivalEvent } from '../../../models/event.model';
import { Router } from '@angular/router';
import {ReservationModalComponent} from '../../../shared/reservation-modal/reservation-modal.component';
@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, ReservationModalComponent],
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent {

  @Input() event!: FestivalEvent;

  @Output() details = new EventEmitter<number>();
  @Output() reserveEvent = new EventEmitter<number>();

  viewDetails() {
    this.details.emit(this.event.id);
  }
  constructor(private router: Router) {}

  goToReservation() {
    this.router.navigate(['/reservation',this.event.id]);
  }
  reserve() {
    this.reserveEvent.emit(this.event.id);
  }


  getImageUrl(event: FestivalEvent): string {
    const images: Record<number, string> = {
      28: 'assets/events/event.28.png',
      56: 'assets/events/desert-night.png',
      84: 'assets/events/tribal-dance.png',
      112: 'assets/events/5.png',
      140: 'assets/events/6.png',
      168: 'assets/events/7.png',
      196: 'assets/events/8.png',
      197: 'assets/events/9.png',
      244: 'assets/events/10.png',
      252: 'assets/events/19.png',
      280: 'assets/events/12.png',
      308: 'assets/events/13.png',
     336: 'assets/events/15.png',
      364: 'assets/events/16.png',
      392: 'assets/events/17.png',
      420: 'assets/events/18.png'
    };

    return images[event.id] ?? 'assets/events/default.png';
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/events/default.png';
  }

  showModal = false;

  openReservationModal() {
    this.showModal = true;
  }
}

