import {EventListComponent} from './event-list/event-list.component';
import {Component} from '@angular/core';
import { HeroCtaComponent } from '../../component/hero-cta/hero-cta.component';
import { HeroComponent } from '../../component/hero/hero.component';
import { HomePageComponent } from '../home/home-page.component';
import {CommonModule} from '@angular/common';
import {EventCardComponent} from './event-card/event-card.component';
import {NavbarComponent} from '../../shared/navbar/navbar.component';
import {FooterComponent} from '../../shared/footer/footer.component';
import {ReservationModalComponent} from '../../shared/reservation-modal/reservation-modal.component';
import {PaymentModalComponent} from './payment/payment-modal.component';

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [
    CommonModule,
    HeroCtaComponent,
    HomePageComponent,
    HeroComponent,
    EventListComponent,
    EventCardComponent,
    NavbarComponent,
    FooterComponent,

  ],
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent {
  scrollToEvents() {
    document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
  }
}
