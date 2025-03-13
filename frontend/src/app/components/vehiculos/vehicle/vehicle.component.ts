import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
  standalone: true,
  imports: [
    FormsModule,
  ],
})
export class VehicleComponent implements OnInit {
  conductores: any[] = []; // Lista de conductores
  propietarios: any[] = []; // Lista de propietarios
  vehicle = {
    placa: '',
    color: '',
    marca: '',
    tipo: '',
    cedula_conductor: '', // Ajustado para usar cedula en lugar de id
    cedula_propietario: '', // Ajustado para usar cedula en lugar de id
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getConductores();
    this.getPropietarios();
  }

  getConductores(): void {
    this.http.get<any[]>('http://localhost:8000/api/conductores').subscribe(
      (response) => {
        this.renderDropdown('conductor-dropdown', response, 'cedula', [
          'primer_nombre',
          'apellidos',
        ]);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al Obtener Conductores',
          text: 'No se pudo cargar la lista de conductores.',
          confirmButtonText: 'Entendido',
        });
      }
    );
  }

  getPropietarios(): void {
    this.http.get<any[]>('http://localhost:8000/api/propietarios').subscribe(
      (response) => {
        this.renderDropdown('propietario-dropdown', response, 'cedula', [
          'primer_nombre',
          'apellidos',
        ]);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al Obtener Propietarios',
          text: 'No se pudo cargar la lista de propietarios.',
          confirmButtonText: 'Entendido',
        });
      }
    );
  }

  renderDropdown(
    dropdownId: string,
    data: any[],
    valueField: string,
    textFields: string[]
  ): void {
    const dropdown = document.getElementById(dropdownId);
    if (dropdown) {
      dropdown.innerHTML = '<option value="">Seleccione...</option>';
      data.forEach((item) => {
        const option = document.createElement('option');
        option.value = item[valueField];
        option.textContent = textFields.map((field) => item[field]).join(' ');
        dropdown.appendChild(option);
      });
    }
  }

  onRegisterVehicle(): void {
    if (
      !this.vehicle.placa ||
      !this.vehicle.color ||
      !this.vehicle.marca ||
      !this.vehicle.tipo ||
      !this.vehicle.cedula_conductor ||
      !this.vehicle.cedula_propietario
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Campos Obligatorios',
        text: 'Por favor, complete todos los campos antes de enviar.',
        confirmButtonText: 'Entendido',
      });
      return;
    }

    this.http.post('http://localhost:8000/api/vehiculos', this.vehicle).subscribe(
      (response) => {
        console.log('Vehículo registrado exitosamente:', response);
        Swal.fire({
          icon: 'success',
          title: '¡Vehículo Registrado!',
          text: 'El vehículo se ha registrado correctamente.',
          confirmButtonText: 'Entendido',
        });
        this.vehicle = {
          placa: '',
          color: '',
          marca: '',
          tipo: '',
          cedula_conductor: '',
          cedula_propietario: '',
        };
      },
      (error) => {
        console.error('Error al registrar el vehículo:', error);

        if (error.status === 422) {
          Swal.fire({
            icon: 'warning',
            title: 'Error de Validación',
            text: error.error.mensaje || 'Algunos datos no son válidos.',
            footer: this.formatValidationErrors(error.error.errores),
            confirmButtonText: 'Revisar',
          });
        } else if (error.status === 500) {
          Swal.fire({
            icon: 'error',
            title: 'Error del Servidor',
            text: 'Ocurrió un error en el servidor. Intente más tarde.',
            confirmButtonText: 'Entendido',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error Desconocido',
            text: 'No se pudo registrar el vehículo. Intente nuevamente.',
            confirmButtonText: 'Cerrar',
          });
        }
      }
    );
  }

  private formatValidationErrors(errors: any): string {
    let formattedErrors = '<ul>';
    for (const field in errors) {
      if (errors.hasOwnProperty(field)) {
        formattedErrors += `<li>${errors[field].join(', ')}</li>`;
      }
    }
    formattedErrors += '</ul>';
    return formattedErrors;
  }
}