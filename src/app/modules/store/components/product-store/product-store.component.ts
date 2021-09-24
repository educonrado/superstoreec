import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '@data/model/product';

@Component({
  selector: 'app-product-store',
  templateUrl: './product-store.component.html',
  styleUrls: ['./product-store.component.scss']
})
export class ProductStoreComponent {

  @Input()
  product!: Product;
  @Output()
  productClicked: EventEmitter<any> = new EventEmitter();
  today = new Date();

  constructor(

  ) {

  }


  addCart(): void {
    console.log('Agregar al carrito');
    // this.productClicked.emit(this.producto.id);
    //this.cartService.addCart(this.producto);
  }
}
