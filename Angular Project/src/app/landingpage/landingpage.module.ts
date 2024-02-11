import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingpageRoutingModule } from './landingpage-routing.module';
import { HeaderComponent } from './header/header.component';
import { MainContentComponent } from './main-content/main-content.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LinestyleComponent } from './login/linestyle/linestyle.component';
import { LineComponent } from './login/linestyle/line/line.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestcomponentComponent } from './testcomponent/testcomponent.component';
import { MyProfileComponent } from './my-profile/my-profile.component'
import { KendoListModule } from '../kendo-list/kendo-list.module';
import { BackButtonComponent } from './back-button/back-button.component';



@NgModule({
  declarations: [
    HeaderComponent,
    MainContentComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    LinestyleComponent,
    LineComponent,
    TestcomponentComponent,
    MyProfileComponent,
    BackButtonComponent,
    
  ],
  imports: [
    CommonModule,
    LandingpageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    
    
    
    
  ],
  exports:[
    HeaderComponent,
    MainContentComponent,
    HomeComponent,
    MyProfileComponent,
    BackButtonComponent,
     
  ]

   
})
export class LandingpageModule { }
