import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService, EntidadDTO, SectoristaDTO } from '../../../services/api.service';

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

  get f() {
    return this.sectoristasForm.controls;
  }

  cargarEntidades(): void {
    this.apiService.getAllEntidades().subscribe(
      (entidades: EntidadDTO[]) => {
        this.entidadesDisponibles = entidades;
        console.log('✅ Entidades cargadas:', entidades);
      },
      (error) => {
        console.error('❌ Error cargando entidades:', error);
      }
    );
  }

  cargarSectoristas(): void {
    this.apiService.getAllSectoristas().subscribe(
      (sectoristas: SectoristaDTO[]) => {
        this.sectoristas = sectoristas;
        this.isLoading = false;
        console.log('✅ Sectoristas cargados:', sectoristas);
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

    const nuevoSectorista: SectoristaDTO = {
      nombres: this.f['nombres'].value,
      apellidos: this.f['apellidos'].value,
      telefono: this.f['telefono'].value,
      correo: this.f['correo'].value,
      unidadOrganica: this.f['unidadOrganica'].value,
      estado: this.f['estado'].value,
      entidades: this.entidadesSeleccionadas
    };

    this.apiService.createSectorista(nuevoSectorista).subscribe(
      (response: SectoristaDTO) => {
        console.log('✅ Sectorista creado:', response);
        this.sectoristas.push(response);
        this.sectoristasForm.reset();
        this.sectoristasForm.patchValue({
          unidadOrganica: 'Dirección de Registro de Personal Activo',
          estado: 'Activo'
        });
        this.submitted = false;
        this.entidadesSeleccionadas = [];
      },
      (error) => console.error('❌ Error:', error)
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
        (response: SectoristaDTO) => {
          this.sectoristas[this.currentSectoristaIndex] = response;
          this.cancelarEdicion();
        },
        (error) => console.error('❌ Error:', error)
      );
    }
  }

  cancelarEdicion(): void {
    this.currentSectorista = null;
    this.currentSectoristaIndex = -1;
    this.entidadesSeleccionadas = [];
    this.sectoristasForm.reset();
    this.sectoristasForm.patchValue({
      unidadOrganica: 'Dirección de Registro de Personal Activo',
      estado: 'Activo'
    });
    this.submitted = false;
  }

  eliminarSectorista(index: number): void {
    if (confirm('¿Eliminar este sectorista?')) {
      const id = this.sectoristas[index].id;
      if (id) {
        this.apiService.deleteSectorista(id).subscribe(
          () => {
            this.sectoristas.splice(index, 1);
            console.log('✅ Sectorista eliminado');
          },
          (error) => console.error('❌ Error:', error)
        );
      }
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
    if (!existe) {
      this.entidadesSeleccionadas.push(entidad);
    }
  }

  eliminarEntidad(id: number | undefined): void {
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
        (response: SectoristaDTO) => {
          this.sectoristas[this.currentSectoristaIndex] = response;
          this.cerrarModal();
        },
        (error) => console.error('❌ Error:', error)
      );
    }
  }

  getEntidadesDisponiblesParaAgregar(): EntidadDTO[] {
    return this.entidadesDisponibles.filter(e => 
      !this.entidadesSeleccionadas.find(sel => sel.id === e.id)
    );
  }
}
