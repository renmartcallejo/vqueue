import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: any;
  password: any;
  repeatPassword: any;
  showAlert: boolean = false;
  alert = {
    type: '',
    message: ''
  }

  constructor(private service: UserService) { }

  ngOnInit() {
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

  async register(){
    this.service.changeLoadingState(true);

    if(!this.validatePassword()){

      let response = await this.service.register(this.email, this.password)
          .then(response => { return response })
          .catch(err => { return err });
    
      if(response.code){
        this.showAlert = true;
        this.alert.type = 'alert-danger';
        this.alert.message = response.message;
      }
      else if(response.operationType == "signIn"){

        let data = {
          'admin_id': response.user.uid,
          'company':'',
          'email': response.user.email,
          'name': response.user.displayName
        }

        await this.service.addUserAdmin(data).then(response => console.log(response));

        this.showAlert = true;
        this.alert.type = 'alert-success';
        this.alert.message = "You have registered successfully! ";
      }
      
     this.service.changeLoadingState(false);
    }
    else{
      this.showAlert = true;
      this.alert.message = "Password and repeat password should be the same";
      this.service.changeLoadingState(false);
    }

  }

}
