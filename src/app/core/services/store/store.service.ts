import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Appsettings } from '@data/constants/appsettings';
import { Product } from '@data/model/product';
import { Store } from '@data/model/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
    
  store: Observable<Store | undefined>;
  products!: Observable<Product[]>;
  private clientsRef: AngularFirestoreCollection<Store>;
  tienda!: Store;
  private storeSubject = new Subject<Store>();
  loadStoreObservable = this.storeSubject.asObservable();
  private productsSubject = new Subject<Product>();
  loadProductObservanle = this.productsSubject.asObservable();
  
  /**
   * 
   * @param angularFirestore 
   * @param angularFirestorage 
   */
  constructor(
    private angularFirestore: AngularFirestore,
    private angularFirestorage: AngularFireStorage
  ) {
    this.clientsRef = this.angularFirestore.collection(Appsettings.PATH_STORES);
    this.store = new Observable<Store>();
  }

  /**
   * Crear nuevo store
   * @param userUid
   * @param store
   */
  public async createStore(userUid: string, store: Store): Promise<void> {
    await this.clientsRef.doc(userUid).set(store);
  }

  /**
   * Obtener tienda personal en base a uid
   * @param uid
   */
  public async getStore(uid: string): Promise<any> {
    const storeDoc = this.clientsRef.doc(uid);
    this.store = storeDoc.valueChanges();
    this.store.subscribe(st=>{
      this.cargarDataTienda(st as Store);
    }) ;
  }

  private cargarDataTienda(store: Store) {
    this.tienda = store;
    this.storeSubject.next(store);
  }

  /**
   * TODO panel administración
   * // stores: Observable<Store[]> | undefined;
   * Obtener lista de productos
   * @param uid
   */
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

  /*public async getAllStore(): Promise<void> {
    this.stores = this.clientsRef
      .snapshotChanges()
      .pipe(
        map((actions) => actions.map((a) => a.payload.doc.data() as Store))
      );
  }*/


  /**
   * Métodos crud de producto
   * @param uid
   * @param product
   */
  public saveProduct(uid: string, product: Product): void {
    this.clientsRef.doc(uid).collection(Appsettings.PATH_PRODUCTS).add(product);
  }

  /**
   *
   * @param uid
   * @param id
   * @returns
   */
  public getProduct(uid: string, id: string): Observable<any> {
    const productDoc = this.clientsRef
      .doc(uid)
      .collection(Appsettings.PATH_PRODUCTS)
      .doc(id);
    return productDoc.valueChanges();
  }

  /**
   *
   * @param uid
   * @param id
   * @param product
   */
  public updateProduct(uid: string, id: string, product: Product) {
    this.clientsRef
      .doc(uid)
      .collection(Appsettings.PATH_PRODUCTS)
      .doc(id)
      .update(product);
  }

  /**
   *
   * @param uid
   * @param id
   * @param downloadUrl
   */
  public deleteProduct(uid: string, id: string, downloadUrl: string) {
    if (id && downloadUrl) {
      this.angularFirestorage.storage.refFromURL(downloadUrl).delete();
      const ref = this.clientsRef
        .doc(uid)
        .collection(Appsettings.PATH_PRODUCTS)
        .doc(id)
        .delete();
    }
  }
}
