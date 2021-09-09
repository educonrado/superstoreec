import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private angularFireAuth: AngularFireAuth) {}

  async createUser(email: string, password: string): Promise<any> {
    return await this.angularFireAuth.createUserWithEmailAndPassword(
      email,
      password
    );
  }

  async login(email: string, password: string): Promise<any> {
    return await this.angularFireAuth.signInWithEmailAndPassword(
      email,
      password
    );
  }

  async logout(): Promise<any> {
    await this.angularFireAuth.signOut();
  }

  hasUser(): any {
    return this.angularFireAuth.authState;
  }

  async getCurrentUser(): Promise<any> {
    return await this.angularFireAuth.authState.pipe(first()).toPromise();
  }

  getUid(): any {
    return this.angularFireAuth.user;
  }

  loginGoogle(): any {
    return this.angularFireAuth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  async loginMicrosoft(): Promise<any> {
    var provider = new firebase.auth.OAuthProvider('microsoft.com');

    return this.angularFireAuth.signInWithPopup(
      new firebase.auth.OAuthProvider('microsoft.com')
    );
  }
  async loginFacebook(): Promise<any> {
    return this.angularFireAuth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }
}
