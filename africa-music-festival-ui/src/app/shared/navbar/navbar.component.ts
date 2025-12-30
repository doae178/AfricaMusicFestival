import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // 🔐 écouter l’état de connexion
    this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  /* ===== SCROLL ===== */
  scrollToSection(sectionId: string): void {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  /* ===== LOGOUT ===== */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
