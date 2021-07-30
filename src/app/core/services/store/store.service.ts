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
  private clientsRef: AngularFirestoreCollection<Store>;
  constructor(private angularFirestore: AngularFirestore) {
    this.clientsRef = this.angularFirestore.collection(Appsettings.PATH_STORES);
    this.getAllStore();
  }

  public async getAllStore(): Promise<void> {
    this.stores = this.clientsRef
      .snapshotChanges()
      .pipe(
        map((actions) => actions.map((a) => a.payload.doc.data() as Store))
      );
  }

  public async createStore(store: Store, nameStore: string): Promise<void> {
    const storeRef = this.clientsRef.doc(nameStore);
    const docRef = await storeRef.get();
    if (docRef) {
      console.log('Documento existe' + docRef);
    } else {
      console.log('Documento NO existe');
      return await this.clientsRef.doc(nameStore).set(store);
    }
  }

  public async getStore(nameStore: string): Promise<any> {
    this.clientsRef
      .doc(nameStore)
      .get().pipe();
      /*.subscribe((doc) => {
        console.log(doc.data());
      });*/
  }
}
