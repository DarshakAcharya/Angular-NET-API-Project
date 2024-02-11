import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KendoTableComponent } from './kendo-table/kendo-table.component';
import { FormComponent } from './form/form.component';
import { LoginComponent } from '../landingpage/login/login.component';
import { HomeComponent } from '../landingpage/home/home.component';
import { AuthenticationGuard } from '../authentication.guard';

 

const routes: Routes = [
  // { path:'', redirectTo:'/login',pathMatch:'full'},
  // { path:'login',component:LoginComponent},
  // { path:'Home',component:HomeComponent, canActivate:[AuthenticationGuard]},
  { path:'kendo-table', component:KendoTableComponent},
  { path:'form', component:FormComponent },
  
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KendoListRoutingModule { }
