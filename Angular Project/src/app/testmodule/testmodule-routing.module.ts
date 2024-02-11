import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestfileComponent } from './testfile/testfile.component';

const routes: Routes = [
   { path:'testfile',component:TestfileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestmoduleRoutingModule { }
