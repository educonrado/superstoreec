import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  displayedColumns = ['producto', 'precio', 'cantidad', 'total', 'actions'];
  ps: Product[] = [];
  emptyCart = true;
  cantidad = 1;
  compra = true;
  formBuy: FormGroup = new FormGroup({});
  /**
   *
   * @param cartService
   */
  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.createFormBuy();
  }

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
    this.productsCart$.subscribe((p) => {
      this.ps = p;
    });
    const res = this.ps
      .map((t) => t.price)
      .reduce((acc, value) => acc + value, 0);
    //var group = _.mapValues()
    return res;
  }

  addItem(): void {
    console.log('Agregando ítem al carrito');
    // TODO obtener product y pasar al addCart
    // this.cartService.addCart();
    this.cantidad += 1;
  }

  removeItem(): void {
    console.log('Removiendo ítem al carrito');
    this.cantidad -= 1;
  }

  comprar(section: string): void {
    console.table(this.ps);
    this.compra = false;
    window.location.hash = '';
    window.location.hash = section;
  }

  onSubmit(): void {}

  private createFormBuy() {
    this.formBuy = this.formBuilder.group({
      buyerName: [null, Validators.required],
      buyerPhone: [
        null,
        [
          Validators.required,
          Validators.pattern('[+0-9]+'),
          Validators.minLength(6),
        ],
      ],
    });
  }
}
