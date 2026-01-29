import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface EntidadDTO {
  id?: number;
  nombre: string;
  descripcion?: string;
  activa?: boolean;
}

export interface SectoristaDTO {
  id?: number;
  nombres: string;
  apellidos: string;
  telefono: string;
  correo: string;
  unidadOrganica: string;
  estado: string;
  entidades: EntidadDTO[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Sectoristas
  getAllSectoristas(): Observable<SectoristaDTO[]> {
    return this.http.get<SectoristaDTO[]>(`${this.apiUrl}/sectoristas`);
  }
  getSectoristaById(id: number): Observable<SectoristaDTO> {
    return this.http.get<SectoristaDTO>(`${this.apiUrl}/sectoristas/${id}`);
  }
  createSectorista(sectorista: SectoristaDTO): Observable<SectoristaDTO> {
    return this.http.post<SectoristaDTO>(`${this.apiUrl}/sectoristas`, sectorista);
  }
  updateSectorista(id: number, sectorista: SectoristaDTO): Observable<SectoristaDTO> {
    return this.http.put<SectoristaDTO>(`${this.apiUrl}/sectoristas/${id}`, sectorista);
  }
  deleteSectorista(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/sectoristas/${id}`);
  }

  // Entidades
  getAllEntidades(): Observable<EntidadDTO[]> {
    return this.http.get<EntidadDTO[]>(`${this.apiUrl}/entidades`);
  }
  getEntidadesActivas(): Observable<EntidadDTO[]> {
    return this.http.get<EntidadDTO[]>(`${this.apiUrl}/entidades/activas`);
  }
  getEntidadById(id: number): Observable<EntidadDTO> {
    return this.http.get<EntidadDTO>(`${this.apiUrl}/entidades/${id}`);
  }
  createEntidad(entidad: EntidadDTO): Observable<EntidadDTO> {
    return this.http.post<EntidadDTO>(`${this.apiUrl}/entidades`, entidad);
  }
  updateEntidad(id: number, entidad: EntidadDTO): Observable<EntidadDTO> {
    return this.http.put<EntidadDTO>(`${this.apiUrl}/entidades/${id}`, entidad);
  }
  deleteEntidad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/entidades/${id}`);
  }
}
