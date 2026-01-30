import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SectoristaDTO } from '../models/sectorista.dto';
import { EntidadDTO } from '../models/entidad.dto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllSectoristas(): Observable<SectoristaDTO[]> {
    return this.http.get<SectoristaDTO[]>(`${this.apiUrl}/sectoristas`);
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

  getAllEntidades(): Observable<EntidadDTO[]> {
    return this.http.get<EntidadDTO[]>(`${this.apiUrl}/entidades`);
  }
}
