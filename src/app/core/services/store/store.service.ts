import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentSnapshot,
} from '@angular/fire/firestore';
import { Appsettings } from '@data/constants/appsettings';
import { Store } from '@data/model/store';
import { Observable } from 'rxjs';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private clientsRef: AngularFirestoreCollection<Store>;
  constructor(private angularFirestore: AngularFirestore) {
    this.clientsRef = this.angularFirestore.collection(Appsettings.PATH_STORES);
  }

  public async createStore(store: Store, uid: string): Promise<void> {
    return await this.clientsRef.doc(uid).set(store);
  }

  public async getStore(uid: string): Promise<any> {
    this.clientsRef.doc(uid).get().subscribe(
      (doc) => {
        console.log(doc.data());
        
      }
    );
  }
}
