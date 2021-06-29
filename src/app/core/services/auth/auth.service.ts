import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularFireAuth: AngularFireAuth
  ) { }

  createUser(email: string, password: string): any {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string): any {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  logout(): any {
    this.angularFireAuth.signOut();
  }

  hasUser(): any {
    return this.angularFireAuth.authState;
  }

  getUid() {
    return this.angularFireAuth.user;
  }
}
