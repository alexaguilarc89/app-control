import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InicioComponent } from './components/dashboard/pages/inicio.component';
import { RegistroComponent } from './components/dashboard/pages/registro.component';
import { SeguimientoComponent } from './components/dashboard/pages/seguimiento.component';
import { AdministracionComponent } from './components/dashboard/pages/administracion.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: InicioComponent },
      { path: 'registro', component: RegistroComponent },
      { path: 'seguimiento', component: SeguimientoComponent },
      { path: 'administracion', component: AdministracionComponent }
    ]
  },
  { path: '**', redirectTo: '/login' }
];
