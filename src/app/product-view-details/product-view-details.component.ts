import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css'],
})
export class ProductViewDetailsComponent implements OnInit {
  product: any;

  selectedProductIndex = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: ProductService
  ) {}
  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product);
  }

  changeIndex(index: any) {
    this.selectedProductIndex = index;
  }

  buyProduct(productId: any) {
    this.router.navigate([
      '/buyProduct',
      {
        isSingleProductCheckout: true,
        id: productId,
      },
    ]);
  }

  addToCart(productId: any) {
    this.service.addToCart(productId).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
