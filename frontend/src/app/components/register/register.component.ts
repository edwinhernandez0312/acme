import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule]
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private http: HttpClient) {}

  onRegister() {
    if (this.password.length < 8) { 
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'La contraseña debe tener al menos 8 caracteres.',
      });
      return;
    }
    
    if (this.password !== this.confirmPassword) { 
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Las contraseñas no coinciden.',
      });
      return;
    }

    const payload = {
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.confirmPassword
    };

    this.http.post('http://localhost:8000/api/register', payload).subscribe(
      (response: any) => {

        // Mostrar SweetAlert al confirmar el registro
        Swal.fire({
          icon: 'success',
          title: '¡Registro Exitoso!',
          text: 'Tu cuenta ha sido creada exitosamente. Ahora puedes iniciar sesión.',
          confirmButtonText: 'Entendido'
        });
      },
      (error) => {
        console.error('Error al registrar el usuario:', error);
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Ocurrió un problema al registrar el usuario.',
        });
      }
    );
  }
}