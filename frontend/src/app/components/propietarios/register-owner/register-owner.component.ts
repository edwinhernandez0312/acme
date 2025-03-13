import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register-owner',
  standalone: true,
  templateUrl: './register-owner.component.html',
  styleUrls: ['./register-owner.component.css'],
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule 
  ]
})
export class RegisterOwnerComponent {
  // Definimos los campos del formulario
  cedula: string = '';
  primerNombre: string = '';
  segundoNombre: string = '';
  apellidos: string = '';
  direccion: string = '';
  telefono: string = '';
  ciudad: string = '';

  constructor(private http: HttpClient) {}

  // Método para manejar el envío del formulario
  onRegisterOwner() {
    if (!this.cedula || !this.primerNombre || !this.apellidos || !this.direccion || !this.telefono || !this.ciudad) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Todos los campos obligatorios deben ser llenados.',
      });
      return;
    }

    const payload = {
      cedula: this.cedula,
      primer_nombre: this.primerNombre,
      segundo_nombre: this.segundoNombre,
      apellidos: this.apellidos,
      direccion: this.direccion,
      telefono: this.telefono,
      ciudad: this.ciudad
    };


this.http.post('http://localhost:8000/api/propietarios', payload).subscribe(
  (response: any) => {

    // Mostrar mensaje de éxito con SweetAlert2
    Swal.fire({
      icon: 'success',
      title: '¡Propietario registrado!',
      text: response.message, // Muestra el mensaje exitoso enviado desde el backend
      confirmButtonText: 'Entendido'
    });

    // Limpia los campos después de un registro exitoso
    this.cedula = '';
    this.primerNombre = '';
    this.segundoNombre = '';
    this.apellidos = '';
    this.direccion = '';
    this.telefono = '';
    this.ciudad = '';
  },
  (error) => {
    console.error('Error al registrar el propietario:', error);

    // Mostrar el mensaje de error exacto que devuelve el backend
    if (error.error?.message) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: error.error.message, // Mostrar el mensaje específico del backend
        confirmButtonText: 'Entendido'
      });
    } else {
      // En caso de un error sin un mensaje específico, mostrar un mensaje genérico
      Swal.fire({
        icon: 'error',
        title: '¡Error inesperado!',
        text: 'Ocurrió un problema al registrar el propietario. Inténtalo nuevamente.',
        confirmButtonText: 'Cerrar'
      });
    }
  }
);
  }
}