import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;
  private isAuthenticatedFlag = false;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      // Solo acceder a localStorage en el navegador
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem('currentUser');
        if (stored) {
          this.currentUser = JSON.parse(stored);
          this.isAuthenticatedFlag = true;
          this.currentUserSubject.next(this.currentUser);
          this.isAuthenticatedSubject.next(true);
        }
      }
    } catch (e) {
      console.error('Error loading user:', e);
      try {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
          localStorage.removeItem('currentUser');
        }
      } catch (err) {
        // Ignorar errores
      }
    }
  }

  login(username: string, password: string): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        // Validación correcta: admin / 123456
        if (username === 'admin' && password === '123456') {
          const user: User = { username, password };
          this.currentUser = user;
          this.isAuthenticatedFlag = true;
          
          try {
            if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
              localStorage.setItem('currentUser', JSON.stringify(user));
            }
          } catch (e) {
            console.error('Error saving user:', e);
          }
          
          this.currentUserSubject.next(user);
          this.isAuthenticatedSubject.next(true);
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      }, 300);
    });
  }

  logout(): void {
    this.currentUser = null;
    this.isAuthenticatedFlag = false;
    
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.removeItem('currentUser');
      }
    } catch (e) {
      console.error('Error removing user:', e);
    }
    
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    // Siempre verificar localStorage para estar sincronizado
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem('currentUser');
        return stored !== null;
      }
    } catch (e) {
      console.error('Error checking authentication:', e);
    }
    return this.isAuthenticatedFlag;
  }

  getCurrentUser(): User | null {
    // También sincronizar el usuario desde localStorage
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem('currentUser');
        if (stored) {
          return JSON.parse(stored);
        }
      }
    } catch (e) {
      console.error('Error getting user:', e);
    }
    return this.currentUser;
  }
}
