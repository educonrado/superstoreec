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
  productsCart$!: Observable<Product[]>;
  displayedColumns = [
    'producto',
    'precio',
    'cantidad',
    'total',
    'actions',
  ];
  ps: Product[] = [];
  emptyCart = true;
  cantidad = 1;
  /**
   *
   * @param cartService
   */
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.productsCart$ = this.cartService.cart$;
  }

  /**
   *
   * @param index
   */
  public confirmationDelete(index: number): void {
    this.cartService.delete(index);
  }

  public getTotalCost(): any {
    this.productsCart$.subscribe(p => {
      this.ps = p;
    });
    return this.ps.map((t) => t.price).reduce((acc, value) => acc + value, 0);
  }

  addItem(): void {
    console.log('Agregando ítem al carrito');
    this.cantidad += 1;
  }
  
  removeItem(): void {
    console.log('Removiendo ítem al carrito');
    this.cantidad -= 1;
  }
}
