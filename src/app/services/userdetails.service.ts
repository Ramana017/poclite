import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserdetailsService {

  constructor() { }

  public loggedIn(): boolean {
    return !!sessionStorage.getItem('useraccount');
  }
  public checkUser(userType):boolean{
    var token = JSON.parse(sessionStorage.getItem('useraccount'));
    if (token != undefined) {
      if (token.priviledFlag == 'all') {
        return true;
      }
      else if (token.priviledFlag == userType) {
        return true;
      } else {
        return false;
      }
    }
  }
  public getUserId(){
    var token = JSON.parse(sessionStorage.getItem('useraccount'));
    return token.userId;
  }
}

