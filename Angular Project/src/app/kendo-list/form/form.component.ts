import { Component, Input, Output, EventEmitter, OnChanges, OnInit  } from '@angular/core';
import { DATA } from 'src/app/kendo-list/form/form-model';
import { FormsModule } from '@angular/forms'
import { Product } from '../kendo-table/product';
import { ProductService } from 'src/app/service/product-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Router  } from '@angular/router';




@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit, OnChanges {

  constructor(private productService: ProductService, private toastr: ToastrService, private formBuilder: FormBuilder,private router:Router) {
    console.log(this.product);

  }
  @Input()
  product: any;
  productData: DATA | undefined;
  editProduct:any;
  
  Categories: any[] = [];

  @Output()
  productAdd = new EventEmitter<DATA>();
  
  // reactiveForm = new FormGroup({
  //   productName: new FormControl('',[Validators.required]),
  //   companyName: new FormControl('',[Validators.required]),
  //   categoryID: new FormControl('',[Validators.required]),
  //   boughtFrom: new FormControl('',[Validators.required]),
  //   price: new FormControl('',[Validators.required]),
  //   productID: new FormControl(' ',[Validators.required]),
  // })

  reactiveForm = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    companyName: new FormControl('', [Validators.required]),
    categoryID: new FormControl('', [Validators.required]),
    boughtFrom: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    productID: new FormControl(' ', [Validators.required]),
  });

 
  
      
  

  public getCategories():void {
    this.productService.getCategories().subscribe(
      (categories:any) => {
        console.log(categories);
        this.Categories = categories;
      }
    );
  }

  get productName(){
    return this.reactiveForm.get('productName');
  }

  get companyName(){
    return this.reactiveForm.get('companyName');
  }

  get categoryID(){
    return this.reactiveForm.get('categoryID');
  }

  get price(){
    return this.reactiveForm.get('price');
  }

  get boughtFrom(){
    return this.reactiveForm.get('boughtFrom');
  }

  get productID(){
    return this.reactiveForm.get('productID');
  }

 


 

  ngOnInit(): void {
    console.log(this.product);
    
  }

  saveChanges() {
    this.productAdd.emit(this.productData);
    // this.productData = undefined;
  }


  EmitProduct(product:any){
    const formValue = this.reactiveForm.value;
    console.log(product);
    const emittedProduct = {
    productName: formValue.productName,
    companyName: formValue.companyName,
    categoryID: formValue.categoryID,
    boughtFrom: formValue.boughtFrom,
    price: formValue.price,
    productID: formValue.productID
  };

  }

 

  ngOnChanges() {
    if (this.product) {
      this.productData = { ...this.product };
    } else {
      this.productData = undefined;
    }

    this.getCategories();

  }


  OnClick(product: DATA) {

    
    console.warn('Onclick has been triggered!');
    console.warn(product);

    if (product.productID ==" " || product.productID == "0") {
      product.productID = "0";
      this.productService.addProduct(product).subscribe({
        next: () => {
          console.log('Adding to the list!');

          // Create a new instance of the DATA class to reset the form
          const emptyProduct = new DATA();

          // Assign the new instance to the product
          this.product = emptyProduct;
          console.log(this.product);
         

          this.toastr.success('Product Added Successfully!', 'Tadaaa..');

          this.productAdd.emit(product);
          
          // this.router.navigate(['Home/kendo-list/kendo-table']);

        },
        error: () => {
          alert('An error occurred while adding your product!');
          console.log('An error occurred while adding your product!');
          
        }
      });
    }
    else if(product.productID != "0") {
      console.log('Editing the product!');
      console.warn('Edit has been triggered!');
    console.warn(product);

    this.productService.updateProduct(product).subscribe({
      next: () => {
        console.log('Updating the list!');
        this.toastr.success('Product Updated Successfully!', 'Tadaaa..');
        // Create a new instance of the DATA class to reset the form
        const emptyProduct = new DATA();

        // Assign the new instance to the product
        this.product = emptyProduct;

        this.productAdd.emit(product);

      },
      error: () => {
        alert('An error occurred while Updating your product!');
        console.log('An error occurred while Updating your product!');
      }
    });
    }

  }

 
}



