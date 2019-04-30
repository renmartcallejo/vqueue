import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.sass']
})
export class SideNavComponent implements OnInit {

  constructor() { }

  @Output() open: EventEmitter<any> = new EventEmitter();
  click: boolean = false;

  ngOnInit() {
    
  }

  createNewEvent(){
    this.click = true;

    if(this.click){
      this.open.emit(this.click);
    }
    else{
      this.open.emit(false);
    }
  }

}
