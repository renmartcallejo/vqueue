import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { AdminService } from '../../../../core/services/admin.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass']
})
export class HistoryComponent implements OnInit {

  currentUser;
  currentDate;
  currentTime;
  events: Array<any>;
  constructor(private userService: UserService, private adminService: AdminService) { }

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
      }) 
  }

  getEvents(events){
    let list = [];

    events.map(event => {
      let data = event.payload.doc.data();
      let queue = Object.entries(data.queue.user)
      let endDate = this.splitInput(data.end_date, '/');

      if(endDate < this.currentDate){
        list.push({
          id: data.event_id,
          title: data.title,
          location: data.location,
          startDate: data.start_date,
          endDate: data.end_date,
          queue: queue
        })
      }
    })

    this.events = list;
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

}
