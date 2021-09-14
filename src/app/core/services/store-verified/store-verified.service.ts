import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentSnapshot } from '@angular/fire/firestore';
import { Appsettings } from '@data/constants/appsettings';
import { Store } from '@data/model/store';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreVerifiedService {
  
  store: Observable<Store | undefined>;
  private storeSubject = new Subject<Store>();
  loadStoreObservable = this.storeSubject.asObservable();
  private clientsRef: AngularFirestoreCollection<Store>;
  constructor(
    private angularFirestore: AngularFirestore,
  ) {
    this.clientsRef = this.angularFirestore.collection(Appsettings.PATH_STORES_VERIFIED);
    this.store = new Observable<Store>();
   }

  /**
   * 
   * @param nameStore 
   * @param storeVerified 
   */
  public async createStoreVerified(nameStore: string | undefined, storeVerified: Store): Promise<void> {
    await this.clientsRef.doc(nameStore).set(storeVerified);
  }

  public async getStore(nameStore: string) {
    const doc = this.clientsRef.doc(nameStore);
    this.store = doc.valueChanges();
    this.store.subscribe((st) => {
      this.cargarDataTienda(st as Store);
    });
  }
  private cargarDataTienda(store: Store) {
    this.storeSubject.next(store);
  }
}
