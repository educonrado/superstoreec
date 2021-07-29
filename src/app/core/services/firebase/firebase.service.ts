import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type CollentionPredicate<T> = string | AngularFirestoreCollection;
type DocumentPredicate<T> = string | AngularFirestoreDocument;

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  constructor(
    private angularFirestore: AngularFirestore
  ) { }

  private col<T>(ref: CollentionPredicate<T>, queryFn?: any): AngularFirestoreCollection {
    return typeof ref === 'string' ? this.angularFirestore.collection(ref, queryFn): ref;
  }

  private doc<T>(ref: DocumentPredicate<T>): AngularFirestoreDocument {
    return typeof ref === 'string' ? this.angularFirestore.doc(ref):ref;
  }

  add<T>(ref: CollentionPredicate<T>, data: Partial<any>) {
    return this.col(ref).add({
      ...data
    });
  }

  col$<T>(ref: CollentionPredicate<T>, queryFn?: any): Observable<any[]>{
    return this.col(ref, queryFn).snapshotChanges().pipe(
      map(docs=>{
        return docs.map(d=>{
          const data = d.payload.doc.data();
          const id = d.payload.doc.id;
          return {id, ...data}
        });
      })
    );
  }

  update<T>(ref: DocumentPredicate<T>, data: Partial<any>) {
    return this.doc(ref).update({
      ...data
    });
  }

  delete<T>(ref: DocumentPredicate<T>) {
    return this.doc(ref).delete();
  }

}
