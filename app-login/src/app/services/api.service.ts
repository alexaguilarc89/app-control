import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

export interface EntidadDTO {
  id?: number;
  nombre: string;
  descripcion?: string;
  activa?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // ==================== SECTORISTAS ====================
  
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

  // ==================== ENTIDADES ====================
  
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
