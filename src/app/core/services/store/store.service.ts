import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentSnapshot,
} from '@angular/fire/firestore';
import { Appsettings } from '@data/constants/appsettings';
import { Product } from '@data/model/product';
import { Store } from '@data/model/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  stores: Observable<Store[]> | undefined;
  store: Observable<Store | undefined>;
  products!: Observable<Product[]>;
  private clientsRef: AngularFirestoreCollection<Store>;
  constructor(private angularFirestore: AngularFirestore) {
    this.clientsRef = this.angularFirestore.collection(Appsettings.PATH_STORES);
    this.store = new Observable<Store>();
  }

  public async getAllStore(): Promise<void> {
    this.stores = this.clientsRef
      .snapshotChanges()
      .pipe(
        map((actions) => actions.map((a) => a.payload.doc.data() as Store))
      );
  }

  public async createStore(userUid: string, store: Store): Promise<void> {
    await this.clientsRef.doc(userUid).set(store);
  }

  public async getStore(uid: string): Promise<any> {
    const storeDoc = this.clientsRef.doc(uid);
    this.store = storeDoc.valueChanges();
    /*.subscribe(a=>{
        console.log(a.data() as Store);
        this.store= a.data() as Store;
      })*/
  }

  public async getProducts(uid: string) {
    const storeDoc = this.clientsRef
      .doc(uid)
      .collection(Appsettings.PATH_PRODUCTS);
    this.products = storeDoc.snapshotChanges().pipe(
      map((action) => {
        return action.map((a) => {
          const data = a.payload.doc.data() as Product;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getProduct(uid: string, id: string): Observable<any> {
    const productDoc = this.clientsRef
      .doc(uid)
      .collection(Appsettings.PATH_PRODUCTS)
      .doc(id);
    return productDoc.valueChanges();
  }

  saveProduct(uid: string, product: Product): void {
    this.clientsRef.doc(uid).collection(Appsettings.PATH_PRODUCTS).add(product);
  }

  updateProduct(uid: string, id: string, product: Product) {
    this.clientsRef
      .doc(uid)
      .collection(Appsettings.PATH_PRODUCTS)
      .doc(id)
      .update(product);
  }
}
