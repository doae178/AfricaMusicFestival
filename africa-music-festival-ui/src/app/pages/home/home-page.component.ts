import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {NavbarComponent} from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({behavior: 'smooth'});
    }
  }
}
