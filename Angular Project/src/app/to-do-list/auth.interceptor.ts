import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'; 
import { Router } from '@angular/router';
 
// constructor(private _authService:AuthService)

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor{
//     intercept(req: HttpRequest<any>, next: HttpHandler) {
//         return next.handle(req);
//         // throw new Error("Method not implemented.");
//     }

// }

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    const token = localStorage.getItem('token');

    if (token) {
      // Add the token to the Authorization header
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request)
  }
}