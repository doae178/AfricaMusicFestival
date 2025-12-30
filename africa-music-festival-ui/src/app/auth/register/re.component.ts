import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './re.component.html',
  styleUrls: ['./re.component.scss']
})
export class RegisterComponent {

  /* ===== ÉTAT ===== */
  loading = false;
  error = '';

  /* ===== MODÈLE FORM ===== */
  form: Record<string, string> = {
    name: '',
    email: '',
    password: ''
  };

  /* ===== CONFIG INPUTS (POUR @for) ===== */
  fields = [
    { key: 'name', type: 'text', placeholder: 'Nom' },
    { key: 'email', type: 'email', placeholder: 'Email' },
    { key: 'password', type: 'password', placeholder: 'Mot de passe' }
  ];

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  /* ===== ACTION ===== */
  register(): void {
    // Validation de la présence des champs
    if (!this.form['name'] || !this.form['email'] || !this.form['password']) {
      this.error = 'Tous les champs sont obligatoires';
      return;
    }

    this.loading = true;
    this.error = '';

    // Appel au service pour l'inscription
    this.auth.register({
      name: this.form['name'],
      email: this.form['email'],
      password: this.form['password']
    }).subscribe({
      next: (res) => {
        this.loading = false;
        this.router.navigate(['/login']); // Redirection après succès
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Erreur lors de la création du compte : ' + err.message;
      }
    });
  }

}
