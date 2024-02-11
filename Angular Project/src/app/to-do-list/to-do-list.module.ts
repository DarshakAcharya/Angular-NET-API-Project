import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToDoListRoutingModule } from './to-do-list-routing.module';
import { MyListComponent } from './my-list/my-list.component';
import { LandingpageModule } from '../landingpage/landingpage.module';


@NgModule({
  declarations: [
    MyListComponent
  ],
  imports: [
    CommonModule,
    ToDoListRoutingModule,
    LandingpageModule,
  ]
})
export class ToDoListModule {
   
 }
