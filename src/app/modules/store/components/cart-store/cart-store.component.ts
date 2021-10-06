import { Component, OnInit } from '@angular/core';
import { CartService } from '@core/services/cart/cart.service';
import { Product } from '@data/model/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cart-store',
  templateUrl: './cart-store.component.html',
  styleUrls: ['./cart-store.component.scss'],
})
export class CartStoreComponent implements OnInit {
  products$!: Observable<Product[]>;
  constructor(private cartService: CartService) {
    //this.products$ = this.cartService.cart$;
    
  }

  ngOnInit(): void {
    this.cartService.cart$
      .pipe(
        map((products) => {
          products.forEach((product: Product) => {
            console.log(product);
          });
        })
      )
      .subscribe();
  }
}
