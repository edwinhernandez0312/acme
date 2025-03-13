import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; 




@Component({
  selector: 'app-root',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterOutlet,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
   constructor(private router: Router) {}
   

    // Método para verificar si estamos en Login o Registro
  shouldShowMenu(): boolean {
    const currentRoute = this.router.url;
    return !(currentRoute === '/login' || currentRoute === '/register');
  }

  

  logout() {
    // Eliminar el token de localStorage
    localStorage.removeItem('authToken');
    // Redirigir al login
    this.router.navigate(['/login']);
  }
}
