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

  
  changeQueueStatus(event_id, doc_id, user_id){
    
    return this.firestore
      .collection("event", ref => ref.where("event_id", "==", event_id))
      .doc(doc_id)
      .update({
        ['queue.user.' + user_id + '.status']: '1'
      })
      .catch(e => e)

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
