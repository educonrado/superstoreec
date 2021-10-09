import { Injectable } from '@angular/core';
import { Product } from '@data/model/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private products: Product[] = [];
  private cart = new BehaviorSubject<Product[]>([]);
  cart$ = this.cart.asObservable();
  
  constructor() { }
  
  /**
   * 
   * @param product 
   */
  addCart(product: Product): void {
    this.products = [...this.products, product];
    this.cart.next(this.products);
  }

  /**
   * 
   * @param index 
   */
  delete(index: number): void {
    this.products.splice(index, 1);
    this.cart.next([...this.products]);
  }
}