import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../../services/event.service';
import { FestivalEvent } from '../../../models/event.model';
import { EventCardComponent } from '../event-card/event-card.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, EventCardComponent],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  events: FestivalEvent[] = [];          // source
  filteredEvents: FestivalEvent[] = [];  // affichage
  loading = true;

  filter: 'week' | 'month' | 'all' = 'week';

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getAll().subscribe({
      next: (events) => {
        console.log('EVENTS BACK', events.length);
        this.events = events;
        this.applyFilter();   // 🔑
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  // =====================
  // FILTRAGE
  // =====================

  applyFilter() {
    const today = new Date();

    if (this.filter === 'week') {
      const end = new Date();
      end.setDate(today.getDate() + 7);

      this.filteredEvents = this.events.filter(e =>
        e.eventDate &&
        new Date(e.eventDate) >= today &&
        new Date(e.eventDate) <= end
      );
    }

    else if (this.filter === 'month') {
      this.filteredEvents = this.events.filter(e => {
        if (!e.eventDate) return false;
        const d = new Date(e.eventDate);
        return (
          d.getMonth() === today.getMonth() &&
          d.getFullYear() === today.getFullYear()
        );
      });
    }

    else {
      this.filteredEvents = [...this.events];
    }
  }

  setFilter(f: 'week' | 'month' | 'all') {
    this.filter = f;
    this.applyFilter();
  }
}
