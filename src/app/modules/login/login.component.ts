import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  userName: any;
  password: any;

  constructor(private service: UserService) { }

  ngOnInit() {

    this.service.getCurrentUser().then(user => console.log(user)).catch(err => console.log(err));

  }

  login(){
    this.service.userLogin(this.userName, this.password).then(response => response);
  }

}
