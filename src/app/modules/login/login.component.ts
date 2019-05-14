import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { Subject } from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: any;
  password: any;
  loginResponse: any;
  alert = {
    message: ''
  }
  show: boolean = false;
  remember: boolean = false;

  private showAlert = new Subject<boolean>();

  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {

    this.service.getCurrentUser().then(user => console.log(user)).catch(err => console.log(err));
    this.showAlertBox();

  }

  showAlertBox(){
    this.showAlert.subscribe((show) => this.show = show);
    this.showAlert.pipe(
      debounceTime(5000)
    ).subscribe(() => this.show = false);
  }

  async login(){
    
    this.service.changeLoadingState(true);

    await this.service.userLogin(this.email, this.password).then(response => this.loginResponse = response);

    if(!this.loginResponse.user){
      this.alert.message = this.loginResponse.message
      this.showAlert.next(true);
      this.service.changeLoadingState(false);
    }
    else{
      
      this.router.navigate(['/admin']);
      this.service.changeLoadingState(false);
    }
  }

  validateInput(){
    if(this.email == null || this.email == "" || this.password == undefined || this.password == ""){
      return { 
        'pointer-events' : 'none'
       }
    }
  }

}
