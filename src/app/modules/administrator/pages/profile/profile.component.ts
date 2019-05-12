import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Output() close: EventEmitter<any> = new EventEmitter(false);

  constructor() { }

  ngOnInit() {
  }

  closeProfile(){
    if(!this.close){
      this.close.emit(true);
    }
    else{
      this.close.emit(false);
    }
  }

}
