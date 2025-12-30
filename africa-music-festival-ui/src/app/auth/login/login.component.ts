import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loading = false;
  error = '';
  form: Record<string, string> = {
    username: '',
    password: ''
  };

  fields = [
    { key: 'username', type: 'email', placeholder: 'Email' },
    { key: 'password', type: 'password', placeholder: 'Mot de passe' }
  ];

  constructor(private auth: AuthService, private router: Router) {}

  trackByFn(index: number, item: any) {
    return item.key;
  }

  login(): void {
    if (!this.form['username'] || !this.form['password']) {
      this.error = 'Veuillez remplir tous les champs';
      return;
    }

    this.loading = true;
    this.error = '';

    this.auth.login({
      username: this.form['username'],
      password: this.form['password']
    }).subscribe({
      next: (response: any) => {
        this.loading = false;
        localStorage.setItem('token', response.token); // Enregistrement du token
        this.router.navigate(['/events']); // Redirection vers la page des événements
      },
      error: (err: any) => {
        this.loading = false;
        this.error = 'Nom d\'utilisateur ou mot de passe incorrect';
      }
    });
  }
}
