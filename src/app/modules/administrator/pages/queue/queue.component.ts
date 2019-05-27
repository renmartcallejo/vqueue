import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { AdminService } from '../../../../core/services/admin.service';
import { BehaviorSubject, Observable } from 'rxjs';


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
  cust_id: string,
  name: string,
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
  queue;
  customer: Customer;
  currentCustomer: BehaviorSubject<any> = new BehaviorSubject<any>({});
  customerState = this.currentCustomer.asObservable();

  constructor(private userService: UserService, private adminService: AdminService) { }

  ngOnInit() {

    this.formatEventTimeAndDate();
    this.initUserForCurrEvt();
    this.customerState.subscribe(customer => {
      this.customer = customer;
    })
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
      })
  }

  getEventQueue(event){

    let queue =  Object.getOwnPropertyNames(event.queue);
    console.log( queue);

    // let { queue, event_id } = event;
    this.queue = queue;
    // this.currentCustomer.next(queue);

    this.adminService.getSpecificEvent(event.event_id)
        .subscribe(event => {
          event.map(e => {
            let eventData = e.payload.doc.data();

            console.log(eventData);

          })
        })

   
  
   
  }

  initDateTimeEvent(data){
    return {
      startDate: this.splitInput(data.start_date, '/'),
      endDate: this.splitInput(data.end_date, '/'),
      startTime: this.splitInput(data.start_time, ':'),
      endTime: this.splitInput(data.end_time, ':')
    }
  }

  currentEventCond(dates, events){
    let firstCond = dates.startDate == this.currentDate && dates.endDate >= this.currentDate;
    let secondCond = dates.endDate > this.currentDate;
    let secondSubCond = dates.endTime <= this.currentTime || dates.endTime >= this.currentTime;
    let thirdCond = dates.startTime <= this.currentTime && dates.endTime >= this.currentTime;

    return firstCond ? secondCond ? secondSubCond ? this.currentEvent = events : '' : thirdCond ? this.currentEvent = events  : '' : '';

  }
  async getCurrentEvent(events){
    await events.map(event => {
      let events = event.payload.doc.data();
      let dates = this.initDateTimeEvent(events);

      this.currentEventCond(dates, events);
      
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
