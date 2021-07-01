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
    try {
      return await this.angularFireAuth.createUserWithEmailAndPassword(
        email,
        password
      );
    } catch (error) {
      console.log('Error encontrado: ' + error);
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      return await this.angularFireAuth.signInWithEmailAndPassword(
        email,
        password
      );
    } catch (error) {
      console.log('Error encontrado: ' + error);
    }
  }

  async logout(): Promise<any> {
    try {
      await this.angularFireAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  hasUser(): any {
    return this.angularFireAuth.authState;
  }

  getCurrentUser() {
    return this.angularFireAuth.authState.pipe(first()).toPromise();
  }

  getUid() {
    return this.angularFireAuth.user;
  }

  loginGoogle(): any {
    try {
      return this.angularFireAuth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );
    } catch (error) {
      console.log(error);
    }
  }
  async loginMicrosoft(): Promise<any> {
    try {
      var provider = new firebase.auth.OAuthProvider('microsoft.com');

      return this.angularFireAuth.signInWithPopup(
        new firebase.auth.OAuthProvider('microsoft.com')
      );
    } catch (error) {
      console.log(error);
    }
  }
  async loginFacebook(): Promise<any> {
    try {
      return this.angularFireAuth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );
    } catch (error) {
      console.log(error);
    }
  }
}
