import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import * as firebase from "firebase/app";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  showLoading : BehaviorSubject<any> = new BehaviorSubject<any>(false);
  loadingState = this.showLoading.asObservable();

  constructor(private _afAuth: AngularFireAuth) { }

  

  getCurrentUser(){
    return new Promise((resolve, reject) => {
      this._afAuth.auth.onAuthStateChanged(user => { user ? resolve(user) : reject('no user logged in!') });
    })
  }


  async userLogin(email, password){
    let login = await this._afAuth.auth.signInWithEmailAndPassword(email, password).then(response => {
     return response
    }).catch(err => {
      return err
    });

    return login;
  }

  changeLoadingState(state){
    if(state){
      this.showLoading.next(true);
    }
    else{
      this.showLoading.next(false);
    }
  }

}
