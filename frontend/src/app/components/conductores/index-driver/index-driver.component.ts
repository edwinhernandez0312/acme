import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-index-driver',
  templateUrl: './index-driver.component.html',
  styleUrls: ['./index-driver.component.css']
})
export class IndexDriverComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Llama a la API para obtener la lista de conductores
    this.http.get<any[]>('http://localhost:8000/api/conductores').subscribe(
      (response) => {

        // Llama a la función que renderiza los datos
        this.renderTable(response);
      },
      (error) => {
        console.error('Error al obtener conductores:', error);
      }
    );
  }

  renderTable(drivers: any[]): void {
    const tableBody = document.getElementById('table-body');

    if (tableBody) {
      tableBody.innerHTML = ''; // Limpia el contenido previo de la tabla

      drivers.forEach((driver, index) => {
        const row = document.createElement('tr');

        // Crea las celdas de la fila con datos
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${driver.cedula}</td>
          <td>${driver.primer_nombre}</td>
          <td>${driver.segundo_nombre || 'N/A'}</td>
          <td>${driver.apellidos}</td>
          <td>${driver.direccion}</td>
          <td>${driver.telefono}</td>
          <td>${driver.ciudad}</td>
          <td>
         <a href="/propietarios/edit/${driver.cedula}" class="btn btn-warning btn-sm d-flex align-items-center">
    <span class="material-icons me-1">edit</span> Editar
        </a>
        `;

        // Agrega la fila al cuerpo de la tabla
        tableBody.appendChild(row);
      });
    }
  }
}