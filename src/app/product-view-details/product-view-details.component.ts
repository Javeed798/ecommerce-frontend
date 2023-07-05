import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css'],
})
export class ProductViewDetailsComponent implements OnInit {
  product: any;

  selectedProductIndex = 0;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}
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
}
