import { Component, OnInit, OnChanges, SimpleChanges,EventEmitter, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileData } from './profileData';
import { returnedUser } from 'src/app/service/returnedUser';
import { UserService } from 'src/app/service/user.service'
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit,OnChanges {

      user = new returnedUser();

      selectedImage!: File; // Add the definite assignment assertion modifier

      base64Image!: string; // Add the definite assignment assertion modifier

      MyImage:string = "";
      


  profileForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('',[Validators.required]),
     password: new FormControl('',Validators.required),
     phone: new FormControl('',Validators.required),
     bloodgroup: new FormControl('',Validators.required),
     gender:new FormControl('',Validators.required),
     image:new FormControl('',Validators.required),
    //  birthdate: new FormControl('',Validators.required),
     userID:new FormControl('',Validators.required)
    
  });

  constructor(private formBuilder: FormBuilder,private router:Router,private userService:UserService,private toastr: ToastrService) {}
  


  
  ngOnChanges(changes: SimpleChanges): void {
   
  }
  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['',Validators.required],
  
      bloodgroup: ['', Validators.required],
      gender: ['', Validators.required],
      image: ['',Validators.required],
      // birthdate: ['', Validators.required],
      userID: ['',Validators.required]
    });

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

  populateForm(): void {
    this.profileForm.patchValue({
      fullName: this.user.fullName,
      email: this.user.email,
      password: this.user.password,
      phone: this.user.phone.toString(),
      
      image:this.user.image,
   
      bloodgroup: this.user.bloodgroup,
      gender: this.user.gender,
      userID: this.user.userID.toString(),
     
    });
  }

  submitForm(): void {
    if (this.profileForm.valid) {
      const formData = this.profileForm.value;
      console.log(formData);
    }
  }

  get fullName(){
    return this.profileForm.get('fullName');
  }
  get email(){
    return this.profileForm.get('email');
  }
  get password(){
    return this.profileForm.get('password');
  }
  get phone(){
    return this.profileForm.get('phone');
  }
  get bloodgroup(){
    return this.profileForm.get('bloodgroup');
  }
  get gender(){
    return this.profileForm.get('gender');
  }

  get image(){
    return this.profileForm.get('image');
  }
  // get birthdate(){
  //   return this.profileForm.get('birthdate');
  // }
  get userID(){
    return this.profileForm.get('userID');
  }



  OnClick(profileData: ProfileData){
    console.log(profileData);
    console.log("OnClick from my-profile.ts has been triggered!");
    profileData.image = this.base64Image;
    this.userService.updateUser(profileData).subscribe({
      next: () => {
        console.log('Updating the User!');
        this.toastr.success('User Updated Successfully!', 'Tadaaa..');
        this.userService.getUser().subscribe(
          (user: returnedUser) => {
            this.user = user;
            console.log(user); // Output the returnedUser object
          },
          (error: any) => {
            console.error(error); // Handle any error that occurred
          }
        );
        
        // Create a new instance of the DATA class to reset the form
        // const emptyProduct = new DATA();

        // Assign the new instance to the product
        // this.product = emptyProduct;

        // this.productAdd.emit(product);

      },
      error: () => {
        alert('An error occurred while Updating your product!');
        console.log('An error occurred while Updating your product!');
      }
    });
  }

  // onFileSelected(event: Event) {
  //   const fileInput = event.target as HTMLInputElement;
  //   if (fileInput.files && fileInput.files.length > 0) {
  //     const file = fileInput.files[0];
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       // Convert the image to base64
  //       this.user.image = reader.result as string;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }


  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImage = fileInput.files[0];
      this.convertImageToBase64();
    }
  }

  convertImageToBase64() {
    const reader = new FileReader();
    reader.onloadend = () => {
      // When the reader is done reading, set the base64Image variable
      this.base64Image = reader.result as string;
     
    };
    reader.readAsDataURL(this.selectedImage);
  }


  UserGetEvent(Email:string | undefined | null){
    console.log(Email+"From my-profile.ts");
    this.userService.getUser().subscribe();
  }
 
}
