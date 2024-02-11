import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyListComponent } from './my-list/my-list.component';
import { HomeComponent } from '../landingpage/home/home.component';

const routes: Routes = [
  { path:'my-list', component:MyListComponent},
  { path:'', component:HomeComponent},
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToDoListRoutingModule { }
