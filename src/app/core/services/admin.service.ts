import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import * as firebase from 'firebase/app'; 
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  currentCustomer: BehaviorSubject<any> = new BehaviorSubject<any>({});
  customerState = this.currentCustomer.asObservable();

  constructor(private firestore: AngularFirestore) { }

  async addNewEvent(data){
    return await this.firestore
      .collection("event")
      .add(data)
      .then(response => { return response },
        error => { return error })
  }

  getCurrentEvent(email){
    return this.firestore
      .collection("event", ref => ref.where("added_by", "==", email))
      .snapshotChanges();

  }

  
  removeCustomerQueue(event_id, doc_id){
    return this.firestore
      .collection("event", ref => ref.where("event_id", "==", event_id))
      .doc(doc_id)
      .update({
        queue: firebase.firestore.FieldValue.arrayRemove("user_1")
      })
      .then(response => {
        console.log(response);
      })

  }

  getSpecificEvent(id){

    return this.firestore
      .collection("event", ref => ref.where("event_id", "==", id))
      .snapshotChanges
    
  }

  changeCustomerState(customer){
    this.currentCustomer.next(customer);
  }
}
