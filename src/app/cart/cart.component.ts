import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private service: ProductService, private router: Router) {}

  cartDetails: any[] = [];
  ngOnInit(): void {
    this.getCartDetails();
  }
  displayedColumns: string[] = [
    'Name',
    'Description',
    'Price',
    'DiscountedPrice',
    'Action',
  ];

  getCartDetails() {
    this.service.getCartDetails().subscribe(
      (res: any) => {
        console.log(res);
        this.cartDetails = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  checkout() {
    // this.service.getProductDetails(false, 0).subscribe(
    //   (res) => {
    //     console.log(res);
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
    this.router.navigate([
      '/buyProduct',
      {
        isSingleProductCheckout: false,
        id: 0,
      },
    ]);
  }

  deleteFromCart(id: any) {
    this.service.deleteFromCart(id).subscribe(
      (res) => {
        console.log(res);
        this.getCartDetails();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
