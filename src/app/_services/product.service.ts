import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  public API_END_POINT = 'http://localhost:9090';

  public addProduct(product: FormData) {
    return this.http.post('http://localhost:9090/addNewProduct', product);
  }
}