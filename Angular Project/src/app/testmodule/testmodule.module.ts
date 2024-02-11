import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestmoduleRoutingModule } from './testmodule-routing.module';
import { TestfileComponent } from './testfile/testfile.component';


@NgModule({
  declarations: [
    TestfileComponent
  ],
  imports: [
    CommonModule,
    TestmoduleRoutingModule
  ]
})
export class TestmoduleModule { }
