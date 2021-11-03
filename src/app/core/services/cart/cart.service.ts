import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Appsettings } from '@data/constants/appsettings';
import { Product } from '@data/model/product';
import { Order } from '@modules/data/order';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private products: Product[] = [];
  private cart = new BehaviorSubject<Product[]>([]);
  cart$ = this.cart.asObservable();
  orderRef: AngularFirestoreCollection<Order>;
  constructor(
    private firebaseService: FirebaseService,
    private angularFirestore: AngularFirestore
  ) {
    this.orderRef = this.angularFirestore.collection(Appsettings.PATH_ORDER);
  }

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

  deleteAllItems(): void {
    this.products = [];
    this.cart.next([...this.products]);
  }

  /**
   * 
   * @param order 
   */
  async createOrder(order: Order): Promise<any> {
    await this.orderRef.add(order);
  }
}
