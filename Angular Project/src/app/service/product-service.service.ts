import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../kendo-list/kendo-table/product';
import { DATA } from '../kendo-list/form/form-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:44313/api/Products';  

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any>{
     const url = 'https://localhost:44313/api/Products/GetCategories';
     return this.http.get<any>(url);
  }

  getProducts(page: number, pageSize: number, sortBy: string, increase: boolean, decrease: boolean,FBcategory:string,FBboughtFrom:string,Search:string): Observable<DATA[]> {
    if (page === 0 && pageSize === 0) {
      page = 1;
      pageSize = 5;
    }
  
    if (increase) {
      page++;
    }
  
    if (decrease) {
      page--;
    }
  
    if (sortBy === " ") {
      sortBy = "default";
    }
  
    const url = `${this.apiUrl}?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&FBcategory=${FBcategory}&FBboughtFrom=${FBboughtFrom}&Search=${Search}`;
    return this.http.get<DATA[]>(url);
  }
  

  getTotalProductCount(): Observable<number> {
    const url = `${this.apiUrl}/count`;
    return this.http.get<number>(url);
    
  }

  //For Sorting the Products Table
  getProductsbyProductNameAsc(category:string,boughtFrom:string,search:string): Observable<DATA[]> {
    console.log('In Product Service for Sorting!');
    // const url = `${this.apiUrl}`;
    // var filteredProducts = this.http.get<DATA[]>(url);
    // return filteredProducts;
    var sortBy = "productnameasc";
    var page=1;
    var pageSize=5;
    var increase=false;
    var decrease=false;
    var FBcategory = category;
    var FBboughtFrom = boughtFrom;
    var Search = search;
    this.getProducts(page,pageSize,sortBy,increase,decrease,FBcategory,FBboughtFrom,Search);
    return this.getProducts(page,pageSize,sortBy,increase,decrease,FBcategory,FBboughtFrom,Search);
  }

  getProductsbyProductNameDesc(category:string,boughtFrom:string,search:string): Observable<DATA[]> {
    // console.log('In Product Service for Sorting!');
    // const url = `${this.apiUrl}/SortBy?sortBy=productnameDesc`;
    // var filteredProducts = this.http.get<DATA[]>(url);
    // return filteredProducts;
    console.log('In Product Service for Sorting!');
    // const url = `${this.apiUrl}`;
    // var filteredProducts = this.http.get<DATA[]>(url);
    // return filteredProducts;
    var sortBy = "productnamedesc";
    var page=1;
    var pageSize=5;
    var increase=false;
    var decrease=false;
    var FBcategory = category;
    var FBboughtFrom = boughtFrom;
    var Search = search;
    this.getProducts(page,pageSize,sortBy,increase,decrease,FBcategory,FBboughtFrom,Search);
    return this.getProducts(page,pageSize,sortBy,increase,decrease,FBcategory,FBboughtFrom,Search);
  }

  getProductsbyComapnyNameAsc(category:string,boughtFrom:string,search:string): Observable<DATA[]> {
    // console.log('In Product Service for Sorting!');
    // const url = `${this.apiUrl}/SortBy?sortBy=CompanyAsc`;
    // var filteredProducts = this.http.get<DATA[]>(url);
    // return filteredProducts;
    console.log('In Product Service for Sorting!');
    // const url = `${this.apiUrl}`;
    // var filteredProducts = this.http.get<DATA[]>(url);
    // return filteredProducts;
    var sortBy = "companyasc";
    var page=1;
    var pageSize=5;
    var increase=false;
    var decrease=false;
    var FBcategory = category;
    var FBboughtFrom = boughtFrom;
    var Search = search;
    this.getProducts(page,pageSize,sortBy,increase,decrease,FBcategory,FBboughtFrom,Search);
    return this.getProducts(page,pageSize,sortBy,increase,decrease,FBcategory,FBboughtFrom,Search);
  }

  getProductsbyCompanyNameDesc(category:string,boughtFrom:string,search:string): Observable<DATA[]> {
    // console.log('In Product Service for Sorting!');
    // const url = `${this.apiUrl}/SortBy?sortBy=CompanyDesc`;
    // var filteredProducts = this.http.get<DATA[]>(url);
    // return filteredProducts;
    console.log('In Product Service for Sorting!');
    // const url = `${this.apiUrl}`;
    // var filteredProducts = this.http.get<DATA[]>(url);
    // return filteredProducts;
    var sortBy = "companydesc";
    var page=1;
    var pageSize=5;
    var increase=false;
    var decrease=false;
    var FBcategory = category;
    var FBboughtFrom = boughtFrom;
    var Search = search;
    this.getProducts(page,pageSize,sortBy,increase,decrease,FBcategory,FBboughtFrom,Search);
    return this.getProducts(page,pageSize,sortBy,increase,decrease,FBcategory,FBboughtFrom,Search);
  }

  getProductsbyCategoryAsc(category:string,boughtFrom:string,search:string): Observable<DATA[]> {
    // console.log('In Product Service for Sorting!');
    // const url = `${this.apiUrl}/SortBy?sortBy=CategoryAsc`;
    // var filteredProducts = this.http.get<DATA[]>(url);
    // return filteredProducts;
    console.log('In Product Service for Sorting!');
    // const url = `${this.apiUrl}`;
    // var filteredProducts = this.http.get<DATA[]>(url);
    // return filteredProducts;
    var sortBy = "categoryasc";
    var page=1;
    var pageSize=5;
    var increase=false;
    var decrease=false;
    var FBcategory = category;
    var FBboughtFrom = boughtFrom;
    var Search = search;
    this.getProducts(page,pageSize,sortBy,increase,decrease,FBcategory,FBboughtFrom,Search);
    return this.getProducts(page,pageSize,sortBy,increase,decrease,FBcategory,FBboughtFrom,Search);
  }

  getProductsbyCategoryDesc(category:string,boughtFrom:string,search:string): Observable<DATA[]> {
    // console.log('In Product Service for Sorting!');
    // const url = `${this.apiUrl}/SortBy?sortBy=CategoryDesc`;
    // var filteredProducts = this.http.get<DATA[]>(url);
    // return filteredProducts;
    console.log('In Product Service for Sorting!');
    // const url = `${this.apiUrl}`;
    // var filteredProducts = this.http.get<DATA[]>(url);
    // return filteredProducts;
    var sortBy = "categorydesc";
    var page=1;
    var pageSize=5;
    var increase=false;
    var decrease=false;
    var FBcategory = category;
    var FBboughtFrom = boughtFrom;
    var Search = search;
    this.getProducts(page,pageSize,sortBy,increase,decrease,FBcategory,FBboughtFrom,Search);
    return this.getProducts(page,pageSize,sortBy,increase,decrease,FBcategory,FBboughtFrom,Search);
  }

  boughtFromAsc(category:string,boughtFrom:string,search:string): Observable<DATA[]> {
    // console.log('In Product Service for Sorting!');
    // const url = `${this.apiUrl}/SortBy?sortBy=BoughtFromAsc`;
    // var filteredProducts = this.http.get<DATA[]>(url);
    // return filteredProducts;
    console.log('In Product Service for Sorting!');
    // const url = `${this.apiUrl}`;
    // var filteredProducts = this.http.get<DATA[]>(url);
    // return filteredProducts;
    var sortBy = "boughtfromasc";
    var page=1;
    var pageSize=5;
    var increase=false;
    var decrease=false;
    var FBcategory = category;
    var FBboughtFrom = boughtFrom;
    var Search = search;
    this.getProducts(page,pageSize,sortBy,increase,decrease,FBcategory,FBboughtFrom,Search);
    return this.getProducts(page,pageSize,sortBy,increase,decrease,FBcategory,FBboughtFrom,Search);
  }

  boughtFromDesc(category:string,boughtFrom:string,search:string): Observable<DATA[]> {
    // console.log('In Product Service for Sorting!');
    // const url = `${this.apiUrl}/SortBy?sortBy=BoughtFromDesc`;
    // var filteredProducts = this.http.get<DATA[]>(url);
    // return filteredProducts;
    console.log('In Product Service for Sorting!');
    // const url = `${this.apiUrl}`;
    // var filteredProducts = this.http.get<DATA[]>(url);
    // return filteredProducts;
    var sortBy = "boughtfromdesc";
    var page=1;
    var pageSize=5;
    var increase=false;
    var decrease=false;
    var FBcategory = category;
    var FBboughtFrom = boughtFrom;
    var Search = search;
    this.getProducts(page,pageSize,sortBy,increase,decrease,FBcategory,FBboughtFrom,Search);
    return this.getProducts(page,pageSize,sortBy,increase,decrease,FBcategory,FBboughtFrom,Search);
  }

  priceAsc(category:string,boughtFrom:string,search:string): Observable<DATA[]> {
    console.log('In Product Service for Sorting!');
    var sortBy = "priceasc";
    var page=1;
    var pageSize=5;
    var increase=false;
    var decrease=false;
    var FBcategory = category;
    var FBboughtFrom = boughtFrom;
    var Search = search;
    this.getProducts(page,pageSize,sortBy,increase,decrease,FBcategory,FBboughtFrom,Search);
    return this.getProducts(page,pageSize,sortBy,increase,decrease,FBcategory,FBboughtFrom,Search);
  }

  priceDesc(category:string,boughtFrom:string,search:string): Observable<DATA[]> {
    console.log('In Product Service for Sorting!');
    var sortBy = "pricedesc";
    var page=1;
    var pageSize=5;
    var increase=false;
    var decrease=false;
    var FBcategory = category;
    var FBboughtFrom = boughtFrom;
    var Search = search;
    this.getProducts(page,pageSize,sortBy,increase,decrease,FBcategory,FBboughtFrom,Search);
    return this.getProducts(page,pageSize,sortBy,increase,decrease,FBcategory,FBboughtFrom,Search);
  }

  


  getProduct(id: number): Observable<Product> {
    // const url = `${this.apiUrl}/${id}`;
    return this.http.get<Product>(this.apiUrl);
  }

  addProduct(product: DATA): Observable<DATA>
  {
    console.warn("I am in Product Service Page");
    console.warn(product);
    // return this.http.post<DATA>(this.apiUrl+"/AddProduct", product);
    const url = `${this.apiUrl}/AddProduct`;
    
    return this.http.post<DATA>(url, product);
  }

  // updateProduct(product: DATA): Observable<DATA> {
  //   // const url = `${this.apiUrl}/${product.productID}`;
  //   console.warn("Trying to Edit product from Product Service!")
  //   // return this.http.put<DATA>(this.apiUrl+"updateProduct/"+product.productID, product);
  //   // return this.http.put<DATA>(this.apiUrl+product.productID,product);
  //   return this.http.put<DATA>(`${this.apiUrl}${product.productID}`, product);

  // }

  updateProduct(product: DATA): Observable<DATA> {
    console.warn("Trying to edit product from Product Service!");
    const url = `${this.apiUrl}/updateProduct/${product.productID}`;
    return this.http.put<DATA>(url, product);
  }

  deleteProduct(id: string | undefined | null): Observable<DATA> {
    // const url = `${this.apiUrl}/${id}`;
    console.warn('Remover from Product Service has been called!');
    // return this.http.delete<void>(this.apiUrl+"deleteProduct");
    const url = `${this.apiUrl}/deleteProduct/${id}`;
    return this.http.post<DATA>(url, id);
  }
}

