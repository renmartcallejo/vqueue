import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../core/services/admin.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-current-event',
  templateUrl: './current-event.component.html',
  styleUrls: ['./current-event.component.scss']
})
export class CurrentEventComponent implements OnInit {

  currentDate;
  currentTime;
  currentEvent: Array<any> = [];
  currentUser: any;
  eventState : boolean = false;
  totalQueue;
  currentEventId;
  events: Array<any> = [];
  queueState: boolean = false;

  constructor(private adminService: AdminService, private userService: UserService) { }

  ngOnInit() {

    this.formatEventTimeAndDate();
    this.initUserForCurrEvt();
  }

  async initUserForCurrEvt(){
    await this.userService.userState
      .subscribe(user => {
        this.currentUser = user;
      })
    await this.adminService.getEvents(this.currentUser.email) 
      .subscribe(events => {
        this.getEvents(events);
        this.getCurrentEvent(events);
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

  async getEvents(events){
    let tempEvents = [];
    await events.map(event => {
      let {title, start_date, end_date, queue} = event.payload.doc.data();
      queue = Object.entries(queue.user)
      let startDate = this.splitInput(start_date, '/');

      if(startDate > this.currentDate){
        tempEvents.push({
          title: title,
          start_date: start_date,
          end_date: end_date,
          queue: queue
        });
      }
    })

    this.events = await tempEvents;
  }

  async getCurrentEvent(events){

    let currentEvent = [];
    
    await events.map(event => {
      let events = {
        data: event.payload.doc.data(),
        id: event.payload.doc.id
      };
      
      let dates = this.initDateTimeEvent(events.data);

      let firstCond = dates.startDate <= this.currentDate && dates.endDate >= this.currentDate;
      let secondCond = dates.endDate > this.currentDate;
      let secondSubCond = dates.endTime <= this.currentTime || dates.endTime >= this.currentTime;
      let thirdCond = dates.startTime <= this.currentTime && dates.endTime >= this.currentTime;

      if(firstCond) {
        if(secondCond){
          if(secondSubCond){
            currentEvent.push(events.data);
            this.currentEventId = events.id;

          }
        }
        else if(thirdCond){
          currentEvent.push(events.data);
          this.currentEventId = events.id
        }
      } 

      currentEvent.map(event => {
        this.totalQueue = Object.keys(event.queue.user)
      });
      
    })

    this.currentEvent = await currentEvent;

    this.eventState = await this.checkEvent(this.currentEvent);
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
    let date = this.convertMonth(current_datetime.getMonth()) + '-' + this.convertDay(current_datetime.getDate())+ '-' + current_datetime.getFullYear()
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

  convertDay(str){
    let day = str.toString();
    if(day.length == 1) {
      return '0' + (parseInt(day))
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

    openQueue(){
      this.queueState = !this.queueState;
    }
  
}
