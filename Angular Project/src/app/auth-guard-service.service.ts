import { Injectable } from '@angular/core';
import { UserService } from './service/user.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate{
  constructor(private auth : UserService, private router : Router){

  }
  canActivate() {
   if(this.auth.IsloggedIn()){
        return true;
   }
   else{
    this.router.navigate(['/login']);
    return false;
   }
  }
}

//,{ queryParams: { returnUrl: state.url } }