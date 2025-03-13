import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-show-vehicle',
  templateUrl: './vehicles-view.component.html',
  styleUrls: ['./vehicles-view.component.css'],
})
export class VehiclesViewComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Llama a la API para obtener la lista de vehículos
    this.http.get<any[]>('http://localhost:8000/api/vehiculos').subscribe(
      (response) => {

        // Llama a la función que renderiza los datos
        this.renderTable(response);
      },
      (error) => {
        console.error('Error al obtener los vehículos:', error);
      }
    );
  }

  renderTable(vehicles: any[]): void {
    const tableBody = document.getElementById('table-body');

    if (tableBody) {
      tableBody.innerHTML = ''; // Limpia el contenido previo de la tabla

      vehicles.forEach((vehicle, index) => {
        const row = document.createElement('tr');

        // Crea las celdas de la fila con los datos de vehículos
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${vehicle.placa}</td>
          <td>${vehicle.marca}</td>
          <td>${vehicle.conductor?.primer_nombre || 'Sin asignar'} ${vehicle.conductor?.apellidos || ''}</td>
          <td>${vehicle.propietario?.primer_nombre || 'Sin asignar'} ${vehicle.propietario?.apellidos || ''}</td>
            <td>
      <a href="/vehiculos/edit/${vehicle.placa}" class="btn btn-warning btn-sm d-flex align-items-center">
    <span class="material-icons me-1">edit</span> Editar
</a>
        `;

        // Agrega la fila al cuerpo de la tabla
        tableBody.appendChild(row);
      });
    }
  }
}