import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

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
}
