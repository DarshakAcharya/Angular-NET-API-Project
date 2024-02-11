import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { returnedUser } from 'src/app/service/returnedUser';
import { UserData } from '../login/login-form';
import { ProfileData } from '../my-profile/profileData';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user = new returnedUser();

 

  constructor(private userService: UserService) {

  }
  ngOnInit(): void {
    var Email = localStorage.getItem("userEmail");
    console.log(Email);
    
    this.userService.saveUser(Email);


    this.userService.getUser().subscribe(
      (user: returnedUser) => {
        this.user = user;
        console.log(user); // Output the returnedUser object
      },
      (error: any) => {
        console.error(error); // Handle any error that occurred
      }
    );
  }

  logOut() {
    this.userService.logOut();
  }

  openMyProfile() {
      
    //1st Getting the User
    // var Email = localStorage.getItem("userEmail");
    // console.log(Email);
    
    // this.userService.saveUser(Email);
    
    

    console.log("wanna check if this line executes or not!?");
    
  }
}
