import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() show: EventEmitter<any> = new EventEmitter(false);

  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {
  }

  async signOut(){
    this.service.changeLoadingState(true);
    return await this.service.signOut().then(
      () => {
        location.reload();
        this.service.changeLoadingState(false);
      }); 
  }

  showProfile(){
    if(!this.show){
      this.show.emit(true);
    }
    else{
      this.show.emit(false);
    }
  }
}
