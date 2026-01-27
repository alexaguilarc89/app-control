import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid">
      <h1 class="mb-4">
        <i class="bi bi-house"></i> Bienvenido
      </h1>
      <div class="row">
        <div class="col-md-12">
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title">¡Bienvenido a tu Dashboard!</h5>
              <p class="card-text">
                Este es el panel de control principal. Utiliza el menú lateral para navegar 
                entre las diferentes secciones: Registro, Seguimiento y Administración.
              </p>
              <hr />
              <p class="text-muted">
                Selecciona una opción del menú para comenzar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class InicioComponent {}
