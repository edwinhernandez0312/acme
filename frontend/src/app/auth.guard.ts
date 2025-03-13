import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Validar si el token de autenticación existe en localStorage
    const token = localStorage.getItem('authToken');

    if (token) {
      return true; // Permitir el acceso si el token está presente
    } else {
      // Redirigir al login si no hay un token
      this.router.navigate(['/login']);
      return false;
    }
  }
}