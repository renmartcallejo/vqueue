import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../../../core/services/admin.service';

@Component({
  selector: 'app-current-event',
  templateUrl: './current-event.component.html',
  styleUrls: ['./current-event.component.sass']
})
export class CurrentEventComponent implements OnInit {

  constructor(private service: AdminService) { }

  ngOnInit() {

    let currEvt = this.service.getCurrentEvent("Tes") 
        .then(response => response);

        currEvt.then(response =>{ console.log(response) });
  }



}
