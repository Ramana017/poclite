import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize, tap } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  public count = 0;
  constructor(public spinner: NgxSpinnerService,private router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log(this.router.url,this.router.url != "/communication-dashboard")
    if(this.router.url!="/communication-dashboard")
    {
    this.spinner.show();

    this.count++;
    // console.log("Interceptor working",this.count)

    return next.handle(req)
      .pipe(tap(
        event => {
          //console.log(event),
        },
        error => {
          console.log(error)
        }
      ), finalize(() => {
        this.count--;
        // console.log("onresponse",this.count)
        if (this.count === 0) {
          // console.log("closing")
          this.spinner.hide()
        }
        else {
          this.spinner.show();
        }
      })
      );
  }
  else{
return next.handle(req) ;
  }}
}
