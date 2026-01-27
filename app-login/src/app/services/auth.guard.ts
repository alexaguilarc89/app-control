import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuth = authService.isAuthenticated();
  const user = authService.getCurrentUser();

  if (isAuth && user) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
