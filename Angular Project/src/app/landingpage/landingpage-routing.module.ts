import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AuthenticationGuard } from '../authentication.guard';

const routes: Routes = [
  { path:' ', component:LoginComponent},
  { path:'Home',component:HomeComponent},
  { path:"kendo-list",loadChildren:()=>import('../kendo-list/kendo-list.module').then(t=>t.KendoListModule) },
  { path:"to-do-list",loadChildren:()=>import('../to-do-list/to-do-list.module').then(l=>l.ToDoListModule) },
  { path:'my-profile',component:MyProfileComponent, canActivate:[AuthenticationGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingpageRoutingModule { }
