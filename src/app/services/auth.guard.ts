import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {ApiserviceService} from './apiservice.service'
import { UserdetailsService } from './userdetails.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanActivateChild
 {
  constructor(private _userDetails: UserdetailsService,
    private _router: Router,
) { }

  canActivate(): boolean {
    console.log("canactivate working")
    if (this._userDetails.loggedIn()) {
      return true;
    } else {
      this._router.navigateByUrl('/login');
      return false;
    }

  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

  if (this._userDetails.checkUser('ceat')===true)// it will chexk for user is admin
     {
      return true;
    }
    else {
      this._router.navigateByUrl('/widgets')
      return false;
    }
  }

}




//     console.log("in Authgurad file current url",state);
//   let ceatRoutes=['/widgets','/registration-re/child-basic','/registration-re/child-guarantor','/registration-re/child-admission','/registration-re/child-payorplan','/registration-re/child-authorization'];
//   let scheduleRoutes=['/widgets','/registration-re/child-basic','/registration-re/child-guarantor','/registration-re/child-admission','/registration-re/child-payorplan','/registration-re/child-authorization'];
// let currentUrl=state.url;
// let userType=ceatRoutes.includes(currentUrl)?'ceat':'schedule'
