import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AdminService } from '../../../../core/services/admin.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Input() user: any;

  closed: boolean = false;

  event = {
    title: '',
    location: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: ''
  }

  alert = {
    type: '',
    message: ''
  }

  showAlert: boolean = false;

  constructor(private adminService: AdminService) {


   }

  ngOnInit() {
    let dateNow = this.initDateTimeNow('/');
    this.event.startDate = dateNow.date;
    this.event.endDate = dateNow.date;
  }

  ngOnChanges(){
    console.log(this.user);
  }

  toHide(){
    this.closed = true;

    this.closed ? this.close.emit(this.closed) : this.close.emit(false);
  }

  initDateTimeNow(attr){
    let format = {
      date: '',
      time: ''
    }
    let current_datetime = new Date()
    let formatted_date = (current_datetime.getMonth() + 1) + attr + current_datetime.getDate() + attr + current_datetime.getFullYear();
    let time = current_datetime.getHours() + attr + current_datetime.getMinutes() + attr + current_datetime.getSeconds();
    format.date = formatted_date;
    format.time = time;

    return format;
  }

  formatEventId(){
    let dateNow = this.initDateTimeNow("-");
    let timeNow = this.initDateTimeNow(":");
    let formatted_date = dateNow.date;
    let time = timeNow.time;
    let date = this.splitInput(formatted_date, '-') + this.splitInput(time, ':')
    return this.reverseString(date);
  }

  splitInput(str, split){
    return str.split(split).join('')
  }

  reverseString(str) {
    var splitString = str.split(""); 
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join(""); 
    return joinArray; 
}

  addNewEvent(){

    // let user = {
    //   [this.user.email]: {
    //     [this.user.email]: this.user.email
    //   },
    // }

    let data = {
      'event_id': 'evt_'+this.formatEventId(),
      'added_by': this.user.email,
      'company': 'Test Inc.',
      'end_date': this.event.endDate,
      'end_time': this.event.endTime,
      'start_date': this.event.startDate,
      'start_time': this.event.startTime,
      'location': this.event.location,
      'queue': {
          'user':{
            'user_1': {
              name: 'test1',
              status: '0'
            },
            'user_2': {
              name: 'test2',
              status: '0'
            }
          }
      },
      'title' : this.event.title,
    }

    console.log(data);

    return this.adminService.addNewEvent(data)
      .then(response => { 
        if(response){
          this.clearEventValues();
          this.showAlert = true;
          this.alert = {
            type: 'alert-success',
            message: 'You have successfully added an event!'
          }
        }
        else{
          this.showAlert = false;
        }
      });
  }

  clearEventValues(){
    this.event = {
      title: '',
      location: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: ''
    }
  }
}
