import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {


  currentUser : any;

  constructor(private router: Router, private service: UserService){}

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
 
      let response;

      this.detectCurrentUser().then(res => response = res);
    

      console.log(response);
      return true;
  }

  async detectCurrentUser(){
    
    await this.service.getCurrentUser().then(
      user => this.currentUser = user,
      err => err);

    console.log(this.currentUser);

    if(this.currentUser){
      return true;
    }
    else{
      this.redirectToLogin();
      return false;
    }

    
  }

  

  redirectToLogin(){
    return this.router.navigate(['/login']);
  }
  
}
