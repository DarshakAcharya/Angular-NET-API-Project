import { Injectable, EventEmitter, Input } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';
import { UserData } from '../landingpage/login/login-form';
import { returnedUser } from './returnedUser';
import { Observable } from 'rxjs';
import { ProfileData } from '../landingpage/my-profile/profileData';

@Injectable({
  providedIn: 'root'
})

 

export class UserService {

  savedUser:string | null = null;
  

  private apiUrl = 'https://localhost:44313/api/Users';  

  constructor(private http:HttpClient,private router:Router,) { }

   

  login(data:any){
      this.http.post<any>("https://localhost:44313/api/Login/authenticate",data).subscribe((result: any)=>{
        console.warn(result);

        localStorage.setItem("token",result.token);
        localStorage.setItem("userEmail",data.email);
         this.router.navigate(['/Home']);
      })
  }

  IsloggedIn(){
    return !!localStorage.getItem('token');
  }
  
  logOut(){
    console.warn('logOut triggered!');
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }

  // getUser(email:string | null){
  //   console.warn(email);
  //   const url = `${this.apiUrl}/getUser?email=${email}`;
  //   return this.http.get<any>(url).subscribe((result:any)=>{
  //     console.log("getting the logged in user!");
  //     console.log(result);
  //   });
  // }

  saveUser(email:string | null){
    this.savedUser = email;
    console.log(this.savedUser);
  }

  getUser(): Observable<returnedUser> {
    var email = this.savedUser
    console.warn(email);
    const url = `${this.apiUrl}/getUser?email=${email}`;
    return this.http.get<returnedUser>(url);
  }

  // updateUser(user:ProfileData): Observable<ProfileData> {
  //     console.log(user);
  //     const url = `${this.apiUrl}/updateUser/${user.userID}`;
  //     return this.http.put<ProfileData>(url, user);
  // }

  updateUser(user: ProfileData): Observable<ProfileData> {
    console.warn("Trying to edit User from User Service!");
    const url = `${this.apiUrl}/updateUser/${user.userID}`;
    return this.http.put<ProfileData>(url, user);
  }


}
