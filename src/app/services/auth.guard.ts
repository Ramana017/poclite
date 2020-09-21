import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {ApiserviceService} from './apiservice.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanActivateChild
 {
  constructor(private _apiservice: ApiserviceService,
    private _router: Router,
) { }

  canActivate(): boolean {
    // console.log("canactivate working");
    if (this._apiservice.loggedIn()) {
      // console.log(this._apiservice);
      return true;
    } else {
      // console.log(this._apiservice);
      this._router.navigateByUrl('/login');
      return false;
    }

  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  if (this._apiservice.checkUser()===true)// it will chexk for user is admin
     {
      return true; // allowed every route
    }
    else {
      this._router.navigateByUrl('/widgets')
      return false; // not allowed to any route
    }
  }

}
