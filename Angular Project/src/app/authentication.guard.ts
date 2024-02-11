import { CanActivateFn,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot,UrlTree,Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthGuard } from './auth-guard-service.service';


@Injectable({
  providedIn:'root'
})

// export const authenticationGuard: CanActivateFn = (route, state) => {
//   return true;
// };

export class AuthenticationGuard implements CanActivate{
  /**
   *
   */
  constructor(private authService:AuthGuard) {
  
    
  }
  canActivate (): boolean
  {
         return this.authService.canActivate();
  }
}