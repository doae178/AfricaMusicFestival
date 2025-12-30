import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8089/api/users'; // URL de l'API
  private loggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    // Si c'est dans le navigateur, vérifie si le token est déjà présent
    if (this.isBrowser()) {
      this.loggedIn$.next(this.hasToken());
    }
  }

  /* ================= REGISTER ================= */
  register(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data).pipe(
      tap((res) => {
        // Enregistres le token dans localStorage si nous sommes dans le navigateur
        if (this.isBrowser()) {
          localStorage.setItem('token', res.token);
          this.loggedIn$.next(true);
        }
      })
    );
  }

  /* ================= LOGIN ================= */
  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, data).pipe(
      tap((res) => {
        // Enregistres le token dans localStorage si nous sommes dans le navigateur
        if (this.isBrowser()) {
          localStorage.setItem('token', res.token);
          this.loggedIn$.next(true);
        }
      })
    );
  }

  /* ================= LOGOUT ================= */
  logout(): void {
    // Supprimer le token de localStorage
    if (this.isBrowser()) {
      localStorage.removeItem('token');
    }
    this.loggedIn$.next(false);
  }

  /* ================= STATE ================= */
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  // Vérifie si le token existe dans le localStorage
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  // Vérifie si l'application est exécutée dans un navigateur
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
