import { Routes } from '@angular/router';
import { EventPageComponent } from './pages/events/event-page.component';
import {PaymentModalComponent} from './pages/events/payment/payment-modal.component';
import {RegisterComponent} from './auth/register/re.component';
import {LoginComponent} from './auth/login/login.component';
import {HomePageComponent} from './pages/home/home-page.component';
// import { ReservationModalComponent } from './pages/ create-reservation/create-reservation.component';

export const routes: Routes = [
  { path: 'events', redirectTo: 'events', pathMatch: 'full' },
  { path: '', component: HomePageComponent },
  { path: 'events', component: EventPageComponent },
  {
    path: 'payment',
    component: PaymentModalComponent
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // { path: 'reservation/:id', component: ReservationModalComponent}
];


