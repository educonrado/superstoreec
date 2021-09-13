import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Appsettings } from '@data/constants/appsettings';
import { Store } from '@data/model/store';

@Injectable({
  providedIn: 'root'
})
export class StoreVerifiedService {

  private clientsRef: AngularFirestoreCollection<Store>;
  constructor(
    private angularFirestore: AngularFirestore,
  ) {
    this.clientsRef = this.angularFirestore.collection(Appsettings.PATH_STORES_VERIFIED);
   }

  /**
   * 
   * @param nameStore 
   * @param storeVerified 
   */
  public async createStoreVerified(nameStore: string | undefined, storeVerified: Store): Promise<void> {
    await this.clientsRef.doc(nameStore).set(storeVerified);
  }
}
