import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Importamos Router
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {} // Inyectamos Router

  // Función que será llamada al enviar el formulario
  onLogin() {
    const payload = {
      email: this.email,
      password: this.password,
    };

    this.http.post('http://localhost:8000/api/login', payload).subscribe(
      (response: any) => {
        console.log(response);
        // Muestra un mensaje de éxito al iniciar sesión
        Swal.fire({
          icon: 'success',
          title: '¡Inicio de sesión exitoso!',
        });

        // Guardar el token en localStorage
        localStorage.setItem('authToken', response.token);

        // Redirigir al usuario a la vista de propietarios
        this.router.navigate(['/propietarios']);
      },
      (error) => {
        // Muestra un mensaje de error si las credenciales son incorrectas
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Correo electrónico o contraseña incorrectos.',
        });
      }
    );
  }
}
