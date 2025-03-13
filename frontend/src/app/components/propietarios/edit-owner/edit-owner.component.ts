import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Para solicitudes HTTP
import { MatCardModule } from '@angular/material/card'; // Para <mat-card>
import { MatFormFieldModule } from '@angular/material/form-field'; // Para <mat-form-field>
import { MatInputModule } from '@angular/material/input'; // Para <input>
import { MatButtonModule } from '@angular/material/button'; // Para botones
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'; // Para mensajes de alerta

@Component({
  selector: 'app-edit-owner',
   imports: [
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],

  templateUrl: './edit-owner.component.html',
  styleUrls: ['./edit-owner.component.css']
})
export class EditOwnerComponent implements OnInit {
  cedula: string = ''; // Captura el parámetro 'cedula'
  ownerData: any = {
    cedula: '',
    primer_nombre: '',
    segundo_nombre: '',
    apellidos: '',
    direccion: '',
    telefono: '',
    ciudad: ''
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtén el parámetro 'cedula' desde la URL
    this.cedula = this.route.snapshot.paramMap.get('cedula') || '';
    this.getOwnerData();
  }

  getOwnerData(): void {
    this.http.get(`http://localhost:8000/api/propietarios/${this.cedula}`).subscribe(
      (response: any) => {
        this.ownerData = response.data; // Carga los datos en el formulario
      },
      (error) => {
        if (error.status === 404) {
          // Mostrar SweetAlert2 para el error 404
          Swal.fire({
            icon: 'error',
            title: 'Error 404',
            text: 'El propietario con esta cédula no fue encontrado.',
            confirmButtonText: 'Regresar a la lista',
            confirmButtonColor: '#3085d6'
          }).then(() => {
            this.router.navigate(['/propietarios']); // Redirige a la lista de propietarios
          });
        } else {
          // Para otros errores
          Swal.fire({
            icon: 'error',
            title: 'Error inesperado',
            text: 'Algo salió mal al cargar los datos. Inténtalo de nuevo más tarde.'
          });
        }
      }
    );

  }

  updateOwner(): void {
    // Llama al backend para actualizar los datos
    this.http.put(`http://localhost:8000/api/propietarios/${this.cedula}`, this.ownerData).subscribe(
      (response) => {
        // Mostrar un mensaje de éxito con SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Actualización exitosa',
          text: 'El propietario se actualizó correctamente.',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          this.router.navigate(['/propietarios']); // Redirige a la lista de propietarios
        });
      },
      (error) => {
        // Manejar errores al actualizar
  
        // Mostrar un mensaje de error con SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar',
          text: 'Ocurrió un problema al intentar actualizar el propietario.',
          confirmButtonText: 'Intentar nuevamente',
          confirmButtonColor: '#d33',
        });
      }
    );
  }
  
}