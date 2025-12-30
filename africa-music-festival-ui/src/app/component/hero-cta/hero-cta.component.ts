import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-cta',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero-cta.component.html',
  styleUrls: ['./hero-cta.component.scss']
})
export class HeroCtaComponent {}
