import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from './product'
import { EditEvent, RemoveEvent, CancelEvent, SaveEvent } from '@progress/kendo-angular-grid';
import { HttpClient } from '@angular/common/http';
import { DATA } from '../form/form-model';
import { ProductService } from 'src/app/service/product-service.service';
import { ToastrService } from 'ngx-toastr';
import { FilterParams } from 'src/app/FilterParams'


@Component({
  selector: 'app-kendo-table',
  templateUrl: './kendo-table.component.html',
  styleUrls: ['./kendo-table.component.css']
})






export class KendoTableComponent implements OnInit {

  

  previousCurrentPage: number | undefined;
  previousPageSize: number | undefined;
  previousSortBy: string = '';
  previousIncrease: boolean | undefined;
  previousDecrease: boolean | undefined;
  previousFBcategory: string = '';
  previousFBboughtFrom: string = '';

  searchQuery: string = '';

  deleteID: string | null | undefined;

  showForm() {
    console.log('showing the form!');
    this.display = true;
    console.log(this.display);
  }


  currentPage: number = 0;
  pageSize: number = 0;
  totalPages: number = 0;
  gridData: DATA[] = [];
  sortBy: string = " ";
  increase: boolean = false;
  decrease: boolean = false;
  display: boolean = false;
  SortedBy: string = "";
  FBcategory: string = "";
  FBboughtFrom: string = "";

  Categories: any[] = [];


  filterParams!: FilterParams;

  selectedBoughtFrom: string = "";
  selectedCategory: string = "";

  ngOnInit(): void {
    this.filterParams = new FilterParams();
    if (!this.selectedProduct) {
      this.selectedProduct = new DATA();
    }



    this.getProducts();

    this.getCategories();
  }

  public getCategories(): void {
    this.productService.getCategories().subscribe(
      (categories: any) => {
        console.log(categories);
        this.Categories = categories;
      }
    );
  }

  public search() {
    console.log('Searching!');
    console.log(this.searchQuery);
    this.getProducts();
  }





  getProducts(): void {
    this.productService.getProducts(this.currentPage, this.pageSize, this.sortBy, this.increase, this.decrease, this.FBcategory, this.FBboughtFrom, this.searchQuery).subscribe(
      (data: any) => {
        console.log(data); // Log the response to inspect its structure


        if (this.SortedBy) {
          this.sortBy = this.SortedBy;
        }

        if (this.previousFBboughtFrom) {
          this.FBboughtFrom = this.previousFBboughtFrom;
        }

        if (this.previousFBcategory) {
          this.FBcategory = this.previousFBcategory;
        }

        // Check if the response has the expected structure
        if (data && data.products) {
          this.gridData = data.products;
          // this.categoryNames = data.products.category.categoryName;
          console.log(this.gridData);
          this.previousCurrentPage = this.currentPage;
          this.previousPageSize = this.pageSize;
          this.previousSortBy = this.sortBy;
          this.previousIncrease = this.previousIncrease;
          this.previousDecrease = this.previousDecrease;
          this.totalPages = data.totalPages;
          console.log(this.sortBy, "|", this.previousSortBy);
        } else {
          console.error('Invalid API response:', data);
        }
      },
      (error: any) => {
        console.error('Error fetching data from API:', error);
      }
    );
    
  }


  filterBy(): void {
    console.log("Filtering!");
    // this.FBboughtFrom = "Offline";
    console.log('Selected Bought From:', this.selectedBoughtFrom);
    console.log('Selected Category:', this.selectedCategory);
    this.FBboughtFrom = this.selectedBoughtFrom;
    this.FBcategory = this.selectedCategory;
    console.log(this.FBcategory, this.FBboughtFrom);
    this.previousFBboughtFrom = this.FBboughtFrom;
    this.previousFBcategory = this.FBcategory;
    this.getProducts();
  }


  nextPage() {
    this.currentPage = this.previousCurrentPage ? this.previousCurrentPage : 1;
    this.sortBy = this.previousSortBy || '';
    this.pageSize = this.previousPageSize ? this.previousPageSize : 5;
    this.increase = this.previousIncrease ?? false;
    this.decrease = this.previousDecrease ?? false;
    console.log(this.totalPages);
    console.log(this.currentPage);
    if (this.currentPage < this.totalPages) {

      this.currentPage++;

      console.log(this.currentPage);
      console.log(this.pageSize);
      console.log(this.sortBy);
      console.log(this.increase);
      console.log(this.decrease);

      this.getProducts();
    }

  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage = this.previousCurrentPage ? this.previousCurrentPage : 1;
      this.sortBy = this.previousSortBy || '';
      this.pageSize = this.previousPageSize ? this.previousPageSize : 5;
      this.increase = this.previousIncrease ?? false;
      this.decrease = this.previousDecrease ?? false;
      this.currentPage--;

      console.log(this.currentPage);
      console.log(this.pageSize);
      console.log(this.sortBy);
      console.log(this.increase);
      console.log(this.decrease);

      this.getProducts();
    }
  }

  constructor(private http: HttpClient, private productService: ProductService, private toastr: ToastrService) { }



  selectedProduct: DATA | undefined;
  editService: any;




  public editHandler(value: DATA): void {
    console.log('editHandler from kendo-table.component.ts called!');
    console.log(value);
    this.display = true;
    this.selectedProduct = value;

  }

  public setSortBy(Sort: string) {
    this.SortedBy = Sort;
  }

  public sortbyProductNameAsc() {
    console.log('sorting by productNameAsc!');
    this.setSortBy("productnameasc");
    this.productService.getProductsbyProductNameAsc(this.FBcategory, this.FBboughtFrom, this.searchQuery).subscribe(
      (data: any) => {
        console.log(data);
        this.gridData = data.products;
      },
      (error: any) => {
        console.error('Error fetching data from API:', error);
      }
    );
    this.gridData = [...this.gridData];
  }

  public sortbyProductNameDesc() {
    console.log('sorting by productNameDesc!');
    this.setSortBy("productnamedesc");
    this.productService.getProductsbyProductNameDesc(this.FBcategory, this.FBboughtFrom, this.searchQuery).subscribe(
      (data: any) => {
        console.log(data);
        this.gridData = data.products;
      },
      (error: any) => {
        console.error('Error fetching data from API:', error);
      }
    );
    this.gridData = [...this.gridData];
  }

  public sortbyCompanyNameAsc() {
    console.log('sorting by CompanyName!');
    this.setSortBy("companyasc");
    this.productService.getProductsbyComapnyNameAsc(this.FBcategory, this.FBboughtFrom, this.searchQuery).subscribe(
      (data: any) => {
        console.log(data);
        this.gridData = data.products;
      },
      (error: any) => {
        console.error('Error fetching data from API:', error);
      }
    );
    this.gridData = [...this.gridData];
  }

  public sortbyCompanyNameDesc() {
    console.log('sorting by CompanyName!');
    this.setSortBy("companydesc");
    this.productService.getProductsbyCompanyNameDesc(this.FBcategory, this.FBboughtFrom, this.searchQuery).subscribe(
      (data: any) => {
        console.log(data);
        this.gridData = data.products;
      },
      (error: any) => {
        console.error('Error fetching data from API:', error);
      }
    );
    this.gridData = [...this.gridData];
  }

  public sortbyCategoryAsc() {
    console.log('sorting by category!');
    this.setSortBy("categoryasc");
    this.productService.getProductsbyCategoryAsc(this.FBcategory, this.FBboughtFrom, this.searchQuery).subscribe(
      (data: any) => {
        console.log(data);
        this.gridData = data.products;
      },
      (error: any) => {
        console.error('Error fetching data from API:', error);
      }
    );
    this.gridData = [...this.gridData];
  }

  public sortbyCategoryDesc() {
    console.log('sorting by category!');
    this.setSortBy("categorydesc");
    this.productService.getProductsbyCategoryDesc(this.FBcategory, this.FBboughtFrom, this.searchQuery).subscribe(
      (data: any) => {
        console.log(data);
        this.gridData = data.products;
      },
      (error: any) => {
        console.error('Error fetching data from API:', error);
      }
    );
    this.gridData = [...this.gridData];
  }

  public boughtFromAsc() {
    console.log('sorting by bought From!');
    this.setSortBy("boughtfromasc");
    this.productService.boughtFromAsc(this.FBcategory, this.FBboughtFrom, this.searchQuery).subscribe(
      (data: any) => {
        console.log(data);
        this.gridData = data.products;
      },
      (error: any) => {
        console.error('Error fetching data from API:', error);
      }
    );
    this.gridData = [...this.gridData];
  }

  public boughtFromDesc() {
    console.log('sorting by bought From!');
    this.setSortBy("boughtfromdesc");
    this.productService.boughtFromDesc(this.FBcategory, this.FBboughtFrom, this.searchQuery).subscribe(
      (data: any) => {
        console.log(data);
        this.gridData = data.products;
      },
      (error: any) => {
        console.error('Error fetching data from API:', error);
      }
    );
    this.gridData = [...this.gridData];
  }

  public priceAsc() {
    console.log('sorting by price!');
    this.setSortBy("priceasc");
    this.productService.priceAsc(this.FBcategory, this.FBboughtFrom, this.searchQuery).subscribe(
      (data: any) => {
        console.log(data);
        this.gridData = data.products;
      },
      (error: any) => {
        console.error('Error fetching data from API:', error);
      }
    );
    this.gridData = [...this.gridData];
  }

  public priceDesc() {
    console.log('sorting by price!');
    this.setSortBy("pricedesc");
    this.productService.priceDesc(this.FBcategory, this.FBboughtFrom, this.searchQuery).subscribe(
      (data: any) => {
        console.log(data);
        this.gridData = data.products;
      },
      (error: any) => {
        console.error('Error fetching data from API:', error);
      }
    );
    this.gridData = [...this.gridData];
  }




  public cancelHandler(args: CancelEvent): void {
    args.sender.closeRow(args.rowIndex);
  }
  public saveHandler(args: SaveEvent): void {
    args.sender.closeRow(args.rowIndex);
  }

  public deleteModal(value: DATA) {
    this.deleteID = value.productID;
    // const modalElement = document.getElementById('deleteProductModal');
    // if (modalElement) {
    //   modalElement.style.display = 'block';
    // }
  }


  public deleteFinal() {
    var delID = this.deleteID;
    this.removeHandler(delID);
    this.deleteID = null;
    
  }

  public removeHandler(value: string | null | undefined): void {
    console.log(value);

    this.productService.deleteProduct(value).subscribe({
      next: () => {
        console.log('Deleting from the list!');

        this.toastr.success('Product Deleted Successfully!', 'Tadaaa..');
        this.getProducts();
        this.deleteID = null;

      },
      error: () => {
        alert('An error occurred while adding your product!');
        console.log('An error occurred while adding your product!');
        this.deleteID = null;
      }
      
      
    });

    

    // const index = this.gridData.findIndex(item => item.productID === value);
    // if (index !== -1) {
    //   this.gridData.splice(index, 1);
    //   this.gridData = [...this.gridData];
    // }
  };

  productAdd(product: DATA) {
    // if (this.selectedProduct) {
    //   // Update existing product
    //   console.log(this.selectedProduct);
    //   const selectedProductID = this.selectedProduct.productID;
    //   const index = this.gridData.findIndex(p => p.productID === selectedProductID);
    //   if (index !== -1) {
    //     this.gridData[index] = { ...product };
    //     this.selectedProduct = undefined; // Clear the selected product after updating
    //     this.gridData = [...this.gridData];
    //   }
    // } else {
    //    Add new product
    //    const newProductID = (this.gridData.length + 1).toString(); // Convert to string
    //    product.productID = newProductID;
    //    this.gridData.push({ ...product });
    //    this.gridData = [...this.gridData];

      

    // }

    this.getProducts();

  }



}
