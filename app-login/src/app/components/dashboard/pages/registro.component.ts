import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService, SectoristaDTO, EntidadDTO } from '../../../services/api.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  sectoristasForm!: FormGroup;
  submitted = false;
  sectoristas: SectoristaDTO[] = [];
  showModal = false;

  entidadesDisponibles: EntidadDTO[] = [];
  entidadesSeleccionadas: EntidadDTO[] = [];
  currentSectorista: SectoristaDTO | null = null;
  currentSectoristaIndex: number = -1;
  isLoading = true;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.cargarEntidades();
    this.cargarSectoristas();
  }

  initForm(): void {
    this.sectoristasForm = this.formBuilder.group({
      nombres: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{7,}$/)]],
      correo: ['', [Validators.required, Validators.email]],
      unidadOrganica: ['Dirección de Registro de Personal Activo', Validators.required],
      estado: ['Activo', Validators.required]
    });
  }

  get f() { return this.sectoristasForm.controls; }

  cargarEntidades(): void {
    this.apiService.getAllEntidades().subscribe(
      (entidades) => this.entidadesDisponibles = entidades,
      (error) => console.error('❌ Error cargando entidades:', error)
    );
  }

  cargarSectoristas(): void {
    this.apiService.getAllSectoristas().subscribe(
      (sectoristas) => {
        this.sectoristas = sectoristas;
        this.isLoading = false;
      },
      (error) => {
        console.error('❌ Error cargando sectoristas:', error);
        this.isLoading = false;
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.sectoristasForm.invalid) return;

    const nuevo: SectoristaDTO = {
      nombres: this.f['nombres'].value,
      apellidos: this.f['apellidos'].value,
      telefono: this.f['telefono'].value,
      correo: this.f['correo'].value,
      unidadOrganica: this.f['unidadOrganica'].value,
      estado: this.f['estado'].value,
      entidades: this.entidadesSeleccionadas
    };

    this.apiService.createSectorista(nuevo).subscribe(
      (resp) => {
        this.sectoristas.push(resp);
        this.sectoristasForm.reset({
          unidadOrganica: 'Dirección de Registro de Personal Activo',
          estado: 'Activo'
        });
        this.submitted = false;
        this.entidadesSeleccionadas = [];
      },
      (err) => console.error('❌ Error creando sectorista:', err)
    );
  }

  editarSectorista(index: number): void {
    const sectorista = this.sectoristas[index];
    this.sectoristasForm.patchValue({
      nombres: sectorista.nombres,
      apellidos: sectorista.apellidos,
      telefono: sectorista.telefono,
      correo: sectorista.correo,
      unidadOrganica: sectorista.unidadOrganica,
      estado: sectorista.estado
    });
    this.currentSectorista = sectorista;
    this.currentSectoristaIndex = index;
    this.entidadesSeleccionadas = [...sectorista.entidades];
  }

  guardarEdicion(): void {
    if (this.currentSectoristaIndex >= 0 && this.currentSectorista?.id) {
      const sectorista: SectoristaDTO = {
        id: this.currentSectorista.id,
        nombres: this.f['nombres'].value,
        apellidos: this.f['apellidos'].value,
        telefono: this.f['telefono'].value,
        correo: this.f['correo'].value,
        unidadOrganica: this.f['unidadOrganica'].value,
        estado: this.f['estado'].value,
        entidades: this.entidadesSeleccionadas
      };
      this.apiService.updateSectorista(this.currentSectorista.id, sectorista).subscribe(
        (resp) => {
          this.sectoristas[this.currentSectoristaIndex] = resp;
          this.cancelarEdicion();
        },
        (err) => console.error('❌ Error actualizando sectorista:', err)
      );
    }
  }

  cancelarEdicion(): void {
    this.currentSectorista = null;
    this.currentSectoristaIndex = -1;
    this.entidadesSeleccionadas = [];
    this.sectoristasForm.reset({
      unidadOrganica: 'Dirección de Registro de Personal Activo',
      estado: 'Activo'
    });
    this.submitted = false;
  }

  eliminarSectorista(index: number): void {
    const id = this.sectoristas[index].id;
    if (id && confirm('¿Eliminar este sectorista?')) {
      this.apiService.deleteSectorista(id).subscribe(
        () => this.sectoristas.splice(index, 1),
        (err) => console.error('❌ Error eliminando sectorista:', err)
      );
    }
  }

  abrirModalEntidades(index: number): void {
    this.currentSectoristaIndex = index;
    this.currentSectorista = this.sectoristas[index];
    this.entidadesSeleccionadas = [...this.currentSectorista.entidades];
    this.showModal = true;
  }

  cerrarModal(): void {
    this.showModal = false;
    this.currentSectorista = null;
    this.currentSectoristaIndex = -1;
    this.entidadesSeleccionadas = [];
  }

  agregarEntidad(entidad: EntidadDTO): void {
    const existe = this.entidadesSeleccionadas.find(e => e.id === entidad.id);
    if (!existe) this.entidadesSeleccionadas.push(entidad);
  }

  eliminarEntidad(id?: number): void {
    if (id !== undefined) {
      this.entidadesSeleccionadas = this.entidadesSeleccionadas.filter(e => e.id !== id);
    }
  }

  guardarEntidades(): void {
    if (this.currentSectoristaIndex >= 0 && this.currentSectorista?.id) {
      const sectorista: SectoristaDTO = {
        ...this.currentSectorista,
        entidades: this.entidadesSeleccionadas
      };
      this.apiService.updateSectorista(this.currentSectorista.id, sectorista).subscribe(
        (resp) => {
          this.sectoristas[this.currentSectoristaIndex] = resp;
          this.cerrarModal();
        },
        (err) => console.error('❌ Error guardando entidades:', err)
      );
    }
  }

  getEntidadesDisponiblesParaAgregar(): EntidadDTO[] {
    return this.entidadesDisponibles.filter(e => !this.entidadesSeleccionadas.find(sel => sel.id === e.id));
  }
}
