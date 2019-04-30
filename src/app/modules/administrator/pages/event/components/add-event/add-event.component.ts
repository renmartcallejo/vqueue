import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  @Output() close: EventEmitter<any> = new EventEmitter();

  closed: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toHide(){
    this.closed = true;

    this.closed ? this.close.emit(this.closed) : this.close.emit(false);
  }

}
