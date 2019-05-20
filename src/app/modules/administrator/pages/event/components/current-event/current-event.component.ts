import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../../../core/services/admin.service';

@Component({
  selector: 'app-current-event',
  templateUrl: './current-event.component.html',
  styleUrls: ['./current-event.component.sass']
})
export class CurrentEventComponent implements OnInit {

  currentDate;
  currentTime;

  constructor(private service: AdminService) { }

  ngOnInit() {
    this.formatEventTimeAndDate();
    this.service.getCurrentEvent("Tes") 
        .subscribe(events => {
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

  getCurrentEvent(events){
    events.map(event => {
      let data = event.payload.doc.data();
      let dates = this.initDateTimeEvent(data);

      if(dates.startDate == this.currentDate && dates.endDate >= this.currentDate){
        if(dates.endDate > this.currentDate && dates.endTime <= this.currentTime){
          console.log(data);
        }  
        else if(dates.startTime <= this.currentTime && dates.endTime >= this.currentTime){
          console.log(data);
        }
      }


    })
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
