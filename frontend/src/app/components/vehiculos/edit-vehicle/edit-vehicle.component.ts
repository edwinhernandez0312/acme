import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-vehicle',
  imports: [
    FormsModule,
  ],
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css'] // Corregido "styleUrl" a "styleUrls"
})

export class EditVehicleComponent implements OnInit {
  placa: string = ''; // Capturar la placa desde la URL
  vehicle: any = {
    placa: '',
    color: '',
    marca: '',
    tipo: '',
    cedula_conductor: '',
    cedula_propietario: ''
  };
  conductores: any[] = []; // Lista de conductores
  propietarios: any[] = []; // Lista de propietarios

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.placa = this.route.snapshot.paramMap.get('placa') || '';
  
    // Primero carga los datos del vehículo, luego sincroniza los selectores
    this.getVehicleData();
    setTimeout(() => {
      this.getConductores();
      this.getPropietarios();
    }, 300); // Asegura que vehicle.cedula_conductor y vehicle.cedula_propietario estén disponibles
  }

  getVehicleData(): void {
    // Obtener los datos del vehículo desde el backend
    this.http.get(`http://localhost:8000/api/vehiculos/${this.placa}`).subscribe(
      (response: any) => {
        this.vehicle = response.data; // Rellenar el formulario con los datos del vehículo
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la información del vehículo.',
          confirmButtonText: 'Entendido'
        });
        this.router.navigate(['/vehiculos']); // Redirigir a la lista de vehículos en caso de error
      }
    );
  }

  getConductores(): void {
    this.http.get<any[]>('http://localhost:8000/api/conductores').subscribe(
      (response) => {
        this.renderDropdown(
          'conductor-dropdown',
          response,
          'cedula',
          ['primer_nombre', 'apellidos'],
          this.vehicle.cedula_conductor // Valor preseleccionado
        );
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
        this.renderDropdown(
          'propietario-dropdown',
          response,
          'cedula',
          ['primer_nombre', 'apellidos'],
          this.vehicle.cedula_propietario // Valor preseleccionado
        );
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
    textFields: string[],
    preselectedValue: string | null
  ): void {
    const dropdown = document.getElementById(dropdownId);
    if (dropdown) {
      dropdown.innerHTML = '<option value="">Seleccione...</option>';
      data.forEach((item) => {
        const option = document.createElement('option');
        option.value = item[valueField];
        option.textContent = textFields.map((field) => item[field]).join(' ');
        if (preselectedValue && item[valueField] === preselectedValue) {
          option.selected = true; // Preseleccionar valor
        }
        dropdown.appendChild(option);
      });
    }
  }

  onUpdateVehicle(): void {
    // Validar campos obligatorios
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
  
    // Realizar solicitud PUT para actualizar el vehículo
    this.http.put(`http://localhost:8000/api/vehiculos/${this.placa}`, this.vehicle).subscribe(
      (response) => {
        console.log('Vehículo actualizado exitosamente:', response);
        Swal.fire({
          icon: 'success',
          title: '¡Vehículo Actualizado!',
          text: 'El vehículo se ha actualizado correctamente.',
          confirmButtonText: 'Entendido',
        }).then(() => {
          this.router.navigate(['/vehiculos']); // Redirigir a la lista de vehículos
        });
      },
      (error) => {
        console.error('Error al actualizar el vehículo:', error);
  
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
            text: 'No se pudo actualizar el vehículo. Intente nuevamente.',
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