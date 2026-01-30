import { EntidadDTO } from './entidad.dto';

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