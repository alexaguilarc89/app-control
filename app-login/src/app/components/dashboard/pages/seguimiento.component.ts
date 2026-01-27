import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Seguimiento {
  id: number;
  registro: string;
  estado: 'pendiente' | 'en-proceso' | 'completado';
  progreso: number;
  fecha: string;
  observaciones: string;
}

@Component({
  selector: 'app-seguimiento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent {
  seguimientos: Seguimiento[] = [
    {
      id: 1,
      registro: 'Solicitud #001',
      estado: 'en-proceso',
      progreso: 75,
      fecha: '2024-01-10',
      observaciones: 'En revisión del administrador'
    },
    {
      id: 2,
      registro: 'Solicitud #002',
      estado: 'pendiente',
      progreso: 25,
      fecha: '2024-01-12',
      observaciones: 'Pendiente de validación'
    },
    {
      id: 3,
      registro: 'Solicitud #003',
      estado: 'completado',
      progreso: 100,
      fecha: '2024-01-08',
      observaciones: 'Completado exitosamente'
    }
  ];

  getEstadoClass(estado: string): string {
    const map: Record<string, string> = {
      'pendiente': 'warning',
      'en-proceso': 'info',
      'completado': 'success'
    };
    return map[estado] || 'secondary';
  }

  getEstadoText(estado: string): string {
    const map: Record<string, string> = {
      'pendiente': 'Pendiente',
      'en-proceso': 'En Proceso',
      'completado': 'Completado'
    };
    return map[estado] || estado;
  }
}
