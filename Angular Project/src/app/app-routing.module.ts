import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from './landingpage/main-content/main-content.component';
import { HomeComponent } from './landingpage/home/home.component';
import { KendoListModule } from './kendo-list/kendo-list.module';
import { LoginComponent } from './landingpage/login/login.component';
import { AuthenticationGuard } from './authentication.guard';
import { TestcomponentComponent } from './landingpage/testcomponent/testcomponent.component';
import { LoginGuard } from './login-guard.service';
import { MyProfileComponent } from './landingpage/my-profile/my-profile.component';
// import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path:'', redirectTo:'/login',pathMatch:'full'},
  { path:'login',component:LoginComponent},
  
  { path:'Home',component:HomeComponent, canActivate:[AuthenticationGuard] },
  { path:"Home/kendo-list",loadChildren:()=>import('./kendo-list/kendo-list.module').then(t=>t.KendoListModule),canActivate:[AuthenticationGuard] },
  { path:"Home/to-do-list",loadChildren:()=>import('./to-do-list/to-do-list.module').then(l=>l.ToDoListModule),canActivate:[AuthenticationGuard]  },
  { path:'Home/testcomponent',component:TestcomponentComponent,canActivate:[AuthenticationGuard]},
  { path:'Home/testmodule',loadChildren:()=>import('./testmodule/testmodule.module').then(t=>t.TestmoduleModule),canActivate:[AuthenticationGuard]},
  { path:'Home/my-profile',component:MyProfileComponent,canActivate:[AuthenticationGuard]},
   
  // {
  //   path: 'protected',
  //   canActivate: [AuthGuard],
  //   loadChildren: () =>
  //     import('./protected/protected.module').then((m) => m.ProtectedModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
