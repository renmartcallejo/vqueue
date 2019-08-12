import { Component, OnInit,  ViewChild, Input } from '@angular/core';
import { AdminService } from '../../../../core/services/admin.service';
import {ClrWizard} from "@clr/angular";



@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})

export class QueueComponent implements OnInit {


  @ViewChild("wizardxl") wizardExtraLarge: ClrWizard;

  @Input() xlOpen: boolean = false;
  @Input() currEvt;
  @Input() currEvtId;

  currentEvent: AppInterface.Event;
  currentUser: any;
  queue: Array<any> = [];
  allUser: Array<any> = [];
  customer: AppInterface.Customer;
  event = {
    event_id : '',
    doc_id: ''
    
  }
  previousUser = [];

  constructor(private adminService: AdminService) { }

  ngOnInit() {

  }

  ngOnChanges(){
    console.log(this.currEvt);
    this.getEventQueue(this.currEvt)
    this.adminService.customerState.subscribe(customer => {
      this.customer = customer;
    })
  }


  nextCustomer(){
    this.previousUser.push(this.queue[0].user_id);
    this.adminService.changeQueueStatus(this.event.event_id, this.currEvtId, this.queue[0].user_id, '1').then(response => {
      this.adminService.changeCustomerState(this.queue[0]);
      console.log(this.previousUser);
    })
  }

  changeStatus(user){
    let status;
    user.statusVal == '0' ? status = '1' : status = '0';

    this.adminService.changeQueueStatus(this.event.event_id, this.currEvtId, user.user_id, status).then(response => {
      this.adminService.changeCustomerState(this.queue[0]);
      console.log(this.previousUser);
    })
  }
  
  getEventQueue(event){

    console.log(event);
    this.event.event_id =  event[0].event_id;
    let initialQueue = [];
    let initialAllUser = [];
    let queueFromDb = Object.entries(event[0].queue.user);


    queueFromDb.map((user, index) => {
      if(index + 1 <= queueFromDb.length){
        if(user[1]['status'] == '0'){

          initialQueue.push({
            index: index,
            user_id: user[0],
            name: user[1]['name'],
            status: user[1]['status'],
            queueTime: user[1]['queueTime'],
          });

          initialQueue = initialQueue.sort((a, b) => { return a.queueTime - b.queueTime });
        }
        if(user[1]['status'] == '0' || user[1]['status'] == '1'){

          let status;

          switch(user[1]['status']){
            case '0':
              status = 'Pending'
              break;
            case '1':
              status = 'Done';
          }

          initialAllUser.push({
            index: index,
            user_id: user[0],
            name: user[1]['name'],
            queueTime: user[1]['queueTime'],
            status: status,
            statusVal : user[1]['status']
          });

          initialAllUser = initialAllUser.sort((a, b) => { return a.queueTime - b.queueTime });
        }
      }
    })

    this.queue = initialQueue;
    this.allUser = initialAllUser;

    this.adminService.changeCustomerState(this.queue[0]);
  }

}
