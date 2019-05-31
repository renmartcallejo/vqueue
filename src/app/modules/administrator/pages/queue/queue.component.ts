import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { AdminService } from '../../../../core/services/admin.service';


interface Event{
  added_by: string,
  company: string,
  end_date: string,
  end_time: string,
  event_id: string,
  location: string,
  queue: Array<any>,
  start_date: string,
  start_time: string,
  title: string,
}

interface Customer{
  index: number,
  customer_id: string,
  name: Object,
}


@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})

export class QueueComponent implements OnInit {

  currentDate;
  currentTime;
  currentEvent: Event;
  currentUser: any;
  queue: Array<any> = [];
  customer: Customer;
  event = {
    event_id : '',
    doc_id: ''
    
  }
  previousUser = [];

  constructor(private userService: UserService, private adminService: AdminService) { }

  ngOnInit() {
    this.userService.changeLoadingState(true);
    this.formatEventTimeAndDate();
    this.initUserForCurrEvt();
    this.userService.changeLoadingState(false);
  }

  async initUserForCurrEvt(){
    
    await this.userService.userState
      .subscribe(user => {
        this.currentUser = user;
      })
    await this.adminService.getCurrentEvent(this.currentUser.email) 
      .subscribe(events => {
        this.getCurrentEvent(events);
        this.getEventQueue(this.currentEvent);
        this.adminService.customerState.subscribe(customer => {
          this.customer = customer;
        })
      })
  }

  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

  nextCustomer(){

    let i = 0;

    this.previousUser.push(this.queue[0].user_id);
    this.adminService.changeQueueStatus(this.event.event_id, this.event.doc_id, this.queue[0].user_id).then(response => {
      this.adminService.changeCustomerState(this.queue[0]);
      console.log(this.previousUser);
    })

  }

  // prevCustomer(){

    
  //   if(this.customer.index > this.queue[0].index){
  //     this.adminService.changeCustomerState(this.queue[this.customer.index-1]);
  //   }
  //   console.log(this.customer);
  // }
  
  getEventQueue(event){

    this.event.event_id =  event.data.event_id;
    this.event.doc_id = event.id;
    let initialQueue = [];
    let queueFromDb = Object.entries(event.data.queue.user);

    queueFromDb.map((user, index) => {
      if(index + 1 <= queueFromDb.length){
        if(user[1]['status'] == '0'){
          initialQueue.push({
            index: index,
            user_id: user[0],
            name: user[1]['name'],
            status: user[1]['status']
          });
        }
      }
    })

    this.queue = initialQueue;

    this.adminService.changeCustomerState(this.queue[0]);
  }

  initDateTimeEvent(events){
    let { data } = events;
    return {
      startDate: this.splitInput(data.start_date, '/'),
      endDate: this.splitInput(data.end_date, '/'),
      startTime: this.splitInput(data.start_time, ':'),
      endTime: this.splitInput(data.end_time, ':')
    }
  }

  currentEventCondition(dates, events){
    let firstCond = dates.startDate <= this.currentDate && dates.endDate >= this.currentDate;
    let secondCond = dates.endDate > this.currentDate;
    let secondSubCond = dates.endTime <= this.currentTime || dates.endTime >= this.currentTime;
    let thirdCond = dates.startTime <= this.currentTime && dates.endTime >= this.currentTime;

    return firstCond ? secondCond ? secondSubCond ? this.currentEvent = events : '' : thirdCond ? this.currentEvent = events  : '' : '';

  }
  async getCurrentEvent(events){

    await events.map(event => {
      let events = {
        id: '',
        data: ''
      }
      events.data = event.payload.doc.data();
      events.id = event.payload.doc.id;
;
      let dates = this.initDateTimeEvent(events);

      this.currentEventCondition(dates, events);
      
    })
 }

  checkEvent(event){
    if(event.length > 0){
      return false;
    }
    else{
      return true;
    }
  }

  formatEventTimeAndDate(){
    let current_datetime = new Date()
    let date = this.convertMonth(current_datetime.getMonth()) + '-' + current_datetime.getDate()+ '-' + current_datetime.getFullYear()
    let time = this.convertTime(current_datetime.getHours()) + ':' + this.convertTime(current_datetime.getMinutes());
    this.currentDate = this.splitInput(date, '-');
    this.currentTime = this.splitInput(time, ':');
  }

  splitInput(str, split){
    return str.split(split).join('')
  }

  convertMonth(str){
    let month = str.toString();
    if(month.length == 1) {
      return '0' + (parseInt(month) + 1)
    }  
    else{
      return str;
    }
  }

  convertTime(str){
    let time = str.toString();
      if(time.length == 1) {
        return '0' + (parseInt(time))
      }  
      else{
        return str;
      }
    }
  

}
