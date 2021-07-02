import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Appsettings } from '@data/constants/appsettings';
import User from '@data/model/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  clientsRef: AngularFirestoreCollection<User>;
  constructor(
    private angularFirestore: AngularFirestore,
    private authService: AuthService
  ) {
    this.clientsRef = this.angularFirestore.collection(
      Appsettings.PATH_CLIENTS
    );
  }

  getAllClients(): Observable<User[]> {
    return this.clientsRef.snapshotChanges().pipe(
      map((clients) =>
        clients.map((client) => ({
          id: client.payload.doc.id,
          ...client.payload.doc.data(),
        }))
      )
    );
  }

  createClient(user: User): any {
    return this.clientsRef.add({ ...user });
  }

  updateClient(id: string, data: any): Promise<void> {
    return this.clientsRef.doc(id).update(data);
  }

  deleteClient(id: string): Promise<void> {
    return this.clientsRef.doc(id).delete();
  }
}
