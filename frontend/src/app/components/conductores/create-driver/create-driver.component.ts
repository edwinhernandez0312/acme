import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-driver',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule 
  ],
  templateUrl: './create-driver.component.html',
  styleUrls: ['./create-driver.component.css']
})
export class CreateDriverComponent {
  cedula: string = '';
  primerNombre: string = '';
  segundoNombre: string = '';
  apellidos: string = '';
  direccion: string = '';
  telefono: string = '';
  ciudad: string = '';

  constructor(private http: HttpClient) {}


    onRegisterDriver() {
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
  
  console.log(payload);
  
  this.http.post('http://localhost:8000/api/conductores', payload).subscribe(
    (response: any) => {
  
      // Mostrar mensaje de éxito con el mensaje del backend
      Swal.fire({
        icon: 'success',
        title: '¡Conductor registrado!',
        text: response.message, // Muestra el mensaje de éxito del backend
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
  
      // Mostrar el mensaje específico del backend en caso de error
      if (error.error?.message) {
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: error.error.message, // Mostrar el mensaje devuelto por el backend
          confirmButtonText: 'Entendido'
        });
      } else {
        // Para otros errores inesperados
        Swal.fire({
          icon: 'error',
          title: '¡Error inesperado!',
          text: 'Ocurrió un problema al registrar el conductor. Inténtalo nuevamente.',
          confirmButtonText: 'Cerrar'
        });
      }
    }
  );
    }
}
