import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { map } from 'rxjs';
import { Product } from '../_model/product.model';
import { ImageProcessingService } from '../image-processing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  pageNumber: number = 0;
  ngOnInit(): void {
    this.getAllProducts();
  }
  productDetails: Product[] = [];

  showLoadButton = false;

  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ) {}

  public getAllProducts() {
    this.productService
      .getAllProducts(this.pageNumber)
      .pipe(
        map((x: Product[], i: number) =>
          x.map((product: Product) =>
            this.imageProcessingService.createImages(product)
          )
        )
      )
      .subscribe(
        (res: Product[]) => {
          console.log(res);
          if (res.length == 8) {
            this.showLoadButton = true;
          } else {
            this.showLoadButton = false;
          }
          res.forEach((p) => this.productDetails.push(p));
        },
        (err) => console.log(err)
      );
  }

  public showProductDetails(productId: any) {
    this.router.navigate(['/productViewDetails', { productId: productId }]);
  }

  loadMoreProducts() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }
}
