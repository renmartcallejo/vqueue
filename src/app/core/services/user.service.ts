import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  showLoading : BehaviorSubject<any> = new BehaviorSubject<any>(false);
  loadingState = this.showLoading.asObservable();

  constructor(private _afAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  

  getCurrentUser(){
    return new Promise((resolve, reject) => {
      this._afAuth.auth.onAuthStateChanged(user => { user ? resolve(user) : reject('no user logged in!') });
    })
  }

  async register(email, password){
    let register = await this._afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(response => { return response })
        .catch(err => { return err });

    return register;
  }


  async userLogin(email, password){
    let login = await this._afAuth.auth.signInWithEmailAndPassword(email, password).then(response => {
     return response
    }).catch(err => {
      return err
    });

    return login;
  }

  async addUserAdmin(data){
    return await this.firestore
          .collection("administrator")
          .add(data)
          .then(response => { return response },
                error => { return error })
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
