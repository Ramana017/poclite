import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private userLoggedIn = new Subject<boolean>();

  constructor() {
    console.log("idle app service");
    this.userLoggedIn.next(false);
  }

  public setUserLoggedIn(userLoggedIn: boolean) {
    this.userLoggedIn.next(userLoggedIn);
  }

  public getUserLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }
}
// service file For idle session Time out
