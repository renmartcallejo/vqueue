import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.sass']
})
export class AdministratorComponent implements OnInit {

  constructor(private service: UserService) { }

  open: boolean = false;
  openProfile : boolean = false;
  user: any;

  ngOnInit() {

    this.service.getCurrentUser().then(user => this.user = user);

  }

  ngOnChanges(){
    console.log(this.openProfile);
  }

  createNewEvent(e){
    e ? this.open = true : this.open = false;
  }

  hideNewEvent(e){
    e ? this.open = false: this.open = true;
  }

  showProfile(e){
    e ? this.openProfile = false : this.openProfile = true;
  }
  
  closeProfile(e){
    e ? this.openProfile = true : this.openProfile = false;
  }
}
