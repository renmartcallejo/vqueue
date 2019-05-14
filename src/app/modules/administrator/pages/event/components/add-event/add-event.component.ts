import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AdminService } from '../../../../../../core/services/admin.service';

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
    start: '',
    end: '',
  }

  alert = {
    type: '',
    message: ''
  }

  showAlert: boolean = false;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }

  ngOnChanges(){
    console.log(this.user);
  }

  toHide(){
    this.closed = true;

    this.closed ? this.close.emit(this.closed) : this.close.emit(false);
  }

  addNewEvent(){

    

    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = this.event.start + ' ' + time;

    let data = {
      'event_id': 'event1',
      'added_by': this.user.email,
      'company': 'Test Inc.',
      'end_date': this.event.end,
      'start_date': dateTime,
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
      start: '',
      end: '',
    }
  }
}
