import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName: any;
  password: any;
  loginRes: any;

  constructor(private service: UserService) { }

  ngOnInit() {

    this.service.getCurrentUser().then(user => console.log(user)).catch(err => console.log(err));

  }

  async login(){
    
    await this.service.userLogin(this.userName, this.password).then(response => this.loginRes = response);

    console.log(this.loginRes.code);
  }

}
