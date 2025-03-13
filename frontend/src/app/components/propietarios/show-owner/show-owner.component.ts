import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-show-owner',
  templateUrl: './show-owner.component.html',
  styleUrls: ['./show-owner.component.css']
})
export class ShowOwnerComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Llama a la API para obtener la lista de propietarios
    this.http.get<any[]>('http://localhost:8000/api/propietarios').subscribe(
      (response) => {

        // Llama a la función que renderiza los datos
        this.renderTable(response);
      },
      (error) => {
        console.error('Error al obtener propietarios:', error);
      }
    );
  }

  renderTable(owners: any[]): void {
    const tableBody = document.getElementById('table-body');

    if (tableBody) {
      tableBody.innerHTML = ''; // Limpia el contenido previo de la tabla

      owners.forEach((owner, index) => {
        const row = document.createElement('tr');

        // Crea las celdas de la fila con datos
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${owner.cedula}</td>
          <td>${owner.primer_nombre}</td>
          <td>${owner.segundo_nombre || 'N/A'}</td>
          <td>${owner.apellidos}</td>
          <td>${owner.direccion}</td>
          <td>${owner.telefono}</td>
          <td>${owner.ciudad}</td>
           <td>
       <a href="/propietarios/edit/${owner.cedula}" class="btn btn-warning btn-sm d-flex align-items-center">
    <span class="material-icons me-1">edit</span> Editar
</a>
        </a>
      </td>
        `;

        // Agrega la fila al cuerpo de la tabla
        tableBody.appendChild(row);
      });
    }
  }
}