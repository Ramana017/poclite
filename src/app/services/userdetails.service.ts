import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserdetailsService {

  constructor() { }

  public checkCeat(): boolean {
    var token = JSON.parse(sessionStorage.getItem('useraccount'));
    if (token != undefined) {
        if (token.priviledFlag == 'ceat') {
          return true;
        }
        else {
          return false;
        }
    }

  }
  public CheckScheduler():boolean{
    var token = JSON.parse(sessionStorage.getItem('useraccount'));
    if (token != undefined) {
        if (token.priviledFlag == "schedule") {
          return true;
        }
        else {
          return false;
        }
    }

  }
  public checkAll(): boolean {
    var token = JSON.parse(sessionStorage.getItem('useraccount'));
    if (token != undefined) {
      if (token.priviledFlag == 'all') {
        return true;
      } else {
        return false;
      }
    }
  }
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
}

