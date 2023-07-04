import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Product } from './_model/product.model';
import { Observable, map, of } from 'rxjs';
import { ProductService } from './_services/product.service';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root',
})
export default class ProductResolveService implements Resolve<Product> {
  constructor(
    private service: ProductService,
    private imageProcessingService: ImageProcessingService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product> {
    const id = route.paramMap.get('productId');
    if (id) {
      // then we have to fetch details from backend'
      return this.service
        .getProductDetailsById(id)
        .pipe(map((p) => this.imageProcessingService.createImages(p)));
    } else {
      // return null object or empty product observable
      //  of is used to convert into Observable
      return of(this.getProductDetails());
    }
  }

  getProductDetails() {
    return {
      productId: null,
      productName: '',
      productDescription: '',
      productDiscountedPrice: 0,
      productActualPrice: 0,
      productImages: [],
    };
  }
}
