import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { OrderDetails } from '../_model/order-details.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  public API_END_POINT = 'http://localhost:9090';

  public addProduct(product: FormData) {
    return this.http.post('http://localhost:9090/addNewProduct', product);
  }

  public getAllProducts(pageNumber: any, searchKeyword: string = '') {
    return this.http.get<Product[]>(
      'http://localhost:9090/getAllProducts?pageNumber=' +
        pageNumber +
        '&searchKey=' +
        searchKeyword
    );
  }

  public deleteProduct(id: any) {
    return this.http.delete('http://localhost:9090/deleteProduct/' + id);
  }

  public getProductDetailsById(productId: any) {
    return this.http.get<Product>(
      'http://localhost:9090/getProductDetailsById/' + productId
    );
  }

  public getProductDetails(isSingleProductCheckout: any, productId: any) {
    return this.http.get<Product[]>(
      'http://localhost:9090/getProductDetails/' +
        isSingleProductCheckout +
        '/' +
        productId
    );
  }

  public placeOrder(orderDetails: OrderDetails) {
    return this.http.post('http://localhost:9090/placeOrder', orderDetails);
  }
}
