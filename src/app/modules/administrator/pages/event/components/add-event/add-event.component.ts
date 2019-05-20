import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AdminService } from '../../../../../../core/services/admin.service';
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
  }

  ngOnChanges(){
    console.log(this.user);
  }

  toHide(){
    this.closed = true;

    this.closed ? this.close.emit(this.closed) : this.close.emit(false);
  }

  formatEventId(){
    let current_datetime = new Date()
    let formatted_date = (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + "-" + current_datetime.getFullYear()
    let time = current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
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
    
    let data = {
      'event_id': 'evt_'+this.formatEventId(),
      'added_by': this.user.email,
      'company': 'Test Inc.',
      'end_date': this.event.endDate,
      'end_time': this.event.endTime,
      'start_date': this.event.startDate,
      'start_time': this.event.startTime,
      'location': this.event.location,
      'queue': [],
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
