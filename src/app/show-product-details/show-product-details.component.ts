import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../image-processing.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css'],
})
export class ShowProductDetailsComponent implements OnInit {
  displayedColumns: string[] = [
    'Id',
    'product Name',
    'product Description',
    'Product Discounted Price',
    'Product Actual Price',
    'Images',
    'Edit',
    'Delete',
  ];

  productDetails: Product[] = [];
  ngOnInit(): void {
    this.getAllProducts();
  }
  constructor(
    private service: ProductService,
    private dialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ) {}

  public getAllProducts() {
    this.service
      .getAllProducts()
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
          this.productDetails = res;
        },
        (err) => console.log(err)
      );
  }

  public deleteProduct(productId: any) {
    this.service.deleteProduct(productId).subscribe(
      (res) => {
        this.getAllProducts();
      },
      (err) => console.log(err)
    );
  }

  showImages(product: any) {
    this.dialog.open(ShowProductImagesDialogComponent, {
      data: {
        images: product.productImages,
      },
      height: '500px',
      width: '800px',
    });
  }

  editProduct(productId: any) {
    this.router.navigate(['/addNewProduct', { productId: productId }]);
  }
}
