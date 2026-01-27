import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);

  sidebarOpen = true;
  currentUsername = '';
  activeRoute = 'inicio';
  private destroy$ = new Subject<void>();

  navItems: NavItem[] = [
    { label: 'Inicio', icon: 'bi-house', route: 'inicio' },
    { label: 'Registro', icon: 'bi-clipboard-check', route: 'registro' },
    { label: 'Seguimiento', icon: 'bi-graph-up', route: 'seguimiento' },
    { label: 'Administración', icon: 'bi-gear', route: 'administracion' }
  ];

  constructor() {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.currentUsername = user.username;
    }

    // Escuchar cambios de ruta
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: any) => {
        const urlSegments = event.urlAfterRedirects.split('/');
        const lastSegment = urlSegments[urlSegments.length - 1];
        if (lastSegment && lastSegment !== 'dashboard') {
          this.activeRoute = lastSegment;
        }
      });

    // Establecer ruta inicial
    const urlSegments = this.router.url.split('/');
    const lastSegment = urlSegments[urlSegments.length - 1];
    if (lastSegment && lastSegment !== 'dashboard') {
      this.activeRoute = lastSegment;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  navigateTo(route: string): void {
    this.router.navigate([`/dashboard/${route}`]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
