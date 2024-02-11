import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css']
})

export class BackButtonComponent {

  constructor(private router:Router) {}


  goToHome(){
    console.log('Back clicked!');
    this.router.navigate(['Home']);
  }



}
