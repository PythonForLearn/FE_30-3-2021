import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/data/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient) { }

  GetProduct(): Observable<Product[]>{
      return this.http.get<Product[]>("https://localhost:44353/api/product/gett");
  }

  InsertProduct(product: Product){
      return this.http.post<any>("https://localhost:44353/api/product/insert", product);
  }

  UpdateProduct(product: Product){
    return this.http.put<any>("https://localhost:44353/api/product/update", product);
  }
  // DeleteProduct(id:string){
  //   return this.http.delete("https://localhost:44353/api/product/delete?id="+id);
  // }

  DeleteProduct(id:string){
    return this.http.delete("https://localhost:44353/api/product/delete?id="+id);
  }
}