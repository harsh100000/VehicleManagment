// src/app/auth.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthservicesService } from './services/authservices.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthservicesService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const userRole = this.authService.getUserRole();

    console.log('isLoggedIn:', isLoggedIn); // Debugging line
    console.log('userRole:', userRole); // Debugging line

    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    const expectedRole = next.data['expectedRole'];
    console.log('expectedRole:', expectedRole); // Debugging line

    if (expectedRole && userRole !== expectedRole) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
