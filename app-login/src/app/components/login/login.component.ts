import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  loading = false;
  errorMessage = '';
  
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(3)]),
      password: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(6)])
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor completa todos los campos correctamente';
      return;
    }

    this.loading = true;
    // Deshabilitar inputs mientras se procesa
    this.f['username'].disable();
    this.f['password'].disable();

    const username = this.f['username'].value;
    const password = this.f['password'].value;

    // Validación correcta: admin / 123456
    if (username === 'admin' && password === '123456') {
      this.authService.login(username, password)
        .subscribe({
          next: (result) => {
            if (result) {
              this.router.navigate(['/dashboard/inicio']);
            } else {
              this.errorMessage = 'Error al guardar la sesión';
              this.f['username'].enable();
              this.f['password'].enable();
            }
            this.loading = false;
          },
          error: () => {
            this.errorMessage = 'Error al intentar iniciar sesión';
            this.f['username'].enable();
            this.f['password'].enable();
            this.loading = false;
          }
        });
    } else {
      this.errorMessage = 'Usuario: admin | Contraseña: 123456';
      this.f['username'].enable();
      this.f['password'].enable();
      this.loading = false;
    }
  }

  onCancel(): void {
    this.loginForm.reset();
    this.submitted = false;
    this.errorMessage = '';
  }
}
