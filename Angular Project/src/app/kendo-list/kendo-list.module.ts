import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KendoListRoutingModule } from './kendo-list-routing.module';
import { KendoTableComponent } from './kendo-table/kendo-table.component';
import { LandingpageModule } from '../landingpage/landingpage.module';
import { GridModule } from '@progress/kendo-angular-grid';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
// import { BackButtonComponent } from '../back-button/back-button.component';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

 
 
// import { TableComponent } from './kendo-table/table/table.component';
 


@NgModule({
  declarations: [
    KendoTableComponent,
    FormComponent,
    // BackButtonComponent,
     
    // TableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    KendoListRoutingModule,
    GridModule,
    LandingpageModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
      
  ],
  exports: [
    // KendoTableComponent,
    // FormComponent,
    // BackButtonComponent,
  ],   
  
})
export class KendoListModule { }
