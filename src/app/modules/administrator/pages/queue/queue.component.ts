import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {


  users: Array<any> = [
    {
      id: '1',
      name: 'Gem',
      creation: 'asda',
      color:'asd'
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
