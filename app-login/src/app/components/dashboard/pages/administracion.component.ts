import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface UsuarioAdmin {
  id: number;
  usuario: string;
  email: string;
  rol: string;
  estado: 'activo' | 'inactivo';
  ultimaActividad: string;
}

@Component({
  selector: 'app-administracion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {
  usuarios: UsuarioAdmin[] = [];
  estadisticas = {
    totalUsuarios: 0,
    solicitudesActivas: 0,
    reportes: 0,
    sistemasActivos: 0
  };

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.usuarios = [
      {
        id: 1,
        usuario: 'admin',
        email: 'admin@ejemplo.com',
        rol: 'Administrador',
        estado: 'activo',
        ultimaActividad: '2024-01-16'
      },
      {
        id: 2,
        usuario: 'supervisor',
        email: 'supervisor@ejemplo.com',
        rol: 'Supervisor',
        estado: 'activo',
        ultimaActividad: '2024-01-15'
      },
      {
        id: 3,
        usuario: 'usuario1',
        email: 'usuario1@ejemplo.com',
        rol: 'Usuario',
        estado: 'activo',
        ultimaActividad: '2024-01-14'
      },
      {
        id: 4,
        usuario: 'usuario2',
        email: 'usuario2@ejemplo.com',
        rol: 'Usuario',
        estado: 'inactivo',
        ultimaActividad: '2024-01-08'
      }
    ];

    this.estadisticas = {
      totalUsuarios: this.usuarios.length,
      solicitudesActivas: 5,
      reportes: 12,
      sistemasActivos: 3
    };
  }

  cambiarEstado(usuario: UsuarioAdmin): void {
    usuario.estado = usuario.estado === 'activo' ? 'inactivo' : 'activo';
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usuarios = this.usuarios.filter(u => u.id !== id);
      this.estadisticas.totalUsuarios = this.usuarios.length;
    }
  }
}
