import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentSnapshot,
} from '@angular/fire/firestore';
import { Appsettings } from '@data/constants/appsettings';
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
  
}
