import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Appsettings } from '@data/constants/appsettings';
import { Store } from '@data/model/store';
import User from '@data/model/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {

  clientsRef: AngularFirestoreCollection<Store>;
  constructor(private firebaseService: FirebaseService,
    private angularFirestore: AngularFirestore) {
      this.clientsRef = this.angularFirestore.collection(Appsettings.PATH_STORES);
    }

  getClient(id: string)  {
    
   
    
    /*return this.firebaseService.col$(
      Appsettings.PATH_CLIENTS,
      (queryFn: { where: (arg0: string, arg1: string, arg2: string) => any }) =>
        queryFn.where('uid', '==', id)
    );*/
  }
  getAllClients(): Observable<Store[]> {
    return this.clientsRef.snapshotChanges().pipe(
      map((clients) =>
        clients.map((client) => ({
          uid: client.payload.doc.id,
          ...client.payload.doc.data(),
        }))
      )
    );
    //return this.firebaseService.col$(Appsettings.PATH_CLIENTS);
  }

  createStore(store: Store) {
    return this.firebaseService.add(Appsettings.PATH_STORES, store);
  }

  /*createClient(user: User): any {
    return this.clientsRef.add({ ...user });
  }*/

  updateClient(id: string, data: any): Promise<void> {
    // return this.clientsRef.doc(id).update(data);
    return this.firebaseService.update(Appsettings.PATH_STORES, data);
  }

  /**
   * Probar funcionamiento
   * @param id
   * @returns
   */
  deleteClient(id: string): Promise<void> {
    // return this.clientsRef.doc(id).delete();
    return this.firebaseService.delete(Appsettings.PATH_STORES);
  }
}
