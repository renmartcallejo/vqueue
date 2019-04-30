import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.sass']
})
export class AdministratorComponent implements OnInit {

  constructor() { }

  open: boolean = false;

  ngOnInit() {
  }

  ngOnChanges(){
  
  }

  createNewEvent(e){
    e ? this.open = true : this.open = false;
  }

  hideNewEvent(e){
    e ? this.open = false: this.open = true;
  }
}
