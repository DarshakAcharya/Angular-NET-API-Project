import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      // Token is present, redirect to the home page
      this.router.navigate(['/home']);
      return false; // Prevent accessing the route
    } else {
      // Token is not present, redirect to the login page
      this.router.navigate(['/login']);
      return false; // Prevent accessing the route
    }
  }
}
