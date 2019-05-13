import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Subject } from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: any;
  password: any;
  repeatPassword: any;
  show: boolean = false;

  alert = {
    type: '',
    message: ''
  }
  private showAlert = new Subject<boolean>();

  constructor(private service: UserService) { }

  ngOnInit() {
    this.showAlertBox();
  }

  showAlertBox(){
    this.showAlert.subscribe((show) => this.show = show);
    this.showAlert.pipe(
      debounceTime(5000)
    ).subscribe(() => this.show = false);
  }

  validatePassword(){
    if(this.repeatPassword !== "" && typeof this.repeatPassword !== "undefined"){
      if(this.password !== this.repeatPassword){
        return true;
      }
    }
    else{
      return false;
    }
  }

  alertState(state, message){

    let alert = {
      responseError: {
        type: 'alert-danger',
        message: message
      },
      successRegister: {
        type: 'alert-success',
        message: message
      },
      distinctPassword : {
        type: 'alert-danger',
        message: message
      }
    }

    this.showAlert.next(true);

    if(state == 1){
      this.alert.type = alert.responseError.type;
      this.alert.message = alert.responseError.message
    }
    else if(state == 2){
      this.alert.type = alert.successRegister.type;
      this.alert.message = alert.successRegister.message;
    }
    else if(state == 3){
      this.alert.type = alert.distinctPassword.type;
      this.alert.message = alert.distinctPassword.message;
    }   

  }

  async storeAdminToDB(response){
  
    let data = {
      'admin_id': response.user.uid,
      'company': {
        'comp_id': '',
        'name': '',
      },
      'email': response.user.email,
      'name': response.user.displayName
    }
    return await this.service.addUserAdmin(data).then(response => console.log(response));
  }

  async register(){
    this.service.changeLoadingState(true);
    if(!this.validatePassword()){
      let response = await this.service.register(this.email, this.password)
          .then(response => { return response })
          .catch(err => { return err });

      if(response.code){
        this.alertState(1, response);
      }
      else if(response.operationType == "signIn"){
        await this.storeAdminToDB(response);
        this.alertState(2, "You have registered successfully!");
      }    
     this.service.changeLoadingState(false);
    }
    else{
      this.alertState(3, "Password and repeat password should be the same");
      this.service.changeLoadingState(false);
    }
  }
  
}
