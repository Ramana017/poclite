import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiserviceService } from './services/apiservice.service';
import { ModalDirective, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Router } from '@angular/router';
import { AppService } from './services/app.service';
import { local } from 'd3';
import { Title } from '@angular/platform-browser';

declare var $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {





  public urljson = "assets/url.json";
  public title = 'Poclite';
  public responseData: any;

  // @ViewChild('childModal', { static: false }) childModal: ModalDirective;
  @ViewChild('template') template;
  childModal2: TemplateRef<any>
  public idleState = 'Not started.';
  public timedOut = false;
  public lastPing?: Date = null;
  public bsmodelRef: BsModalRef;
  public timePopupexist: boolean = false;


  constructor(public _http: HttpClient,
    public apiservice: ApiserviceService, private idle: Idle, private keepalive: Keepalive,
    private router: Router, private modalService: BsModalService, private appService: AppService, title: Title) {
    // sets an idle timeout of 5 seconds, for testing purposes.
    // console.log("inconstructor",(session))
    title.setTitle("POCLite")
    console.log("app.compenent.ts", localStorage.getItem('sessionTimeOut'))

    // idle.setIdle(15*60);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.

    // idle.setTimeout(10);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.timePopupexist = true;
      this.idleState = 'No longer idle.'
      console.log(this.idleState);
      this.reset();
    });

    idle.onTimeout.subscribe(() => {
      // this.childModal.hide();
      this.bsmodelRef.hide();
      this.idleState = 'Session expired!';
      this.timedOut = true;
      console.log(this.idleState);
      sessionStorage.clear();
      setTimeout(() => {
        console.log("Hello from setTimeout");
        this.modalService._hideModal(1);
        this.router.navigateByUrl('login');
        this.appService.setUserLoggedIn(false);

      }, 100);
    });

    idle.onIdleStart.subscribe(() => {
      console.log("popupflag", this.timePopupexist)
      this.idleState = 'You\'ve gone idle!'
      console.log(this.idleState);
      // this.childModal.show();
      this.timePopupexist ? this.bsmodelRef.hide() : ''
      this.bsmodelRef = this.modalService.show(
        this.template,
        Object.assign({}, { class: 'timepopup' })
      );
      this.timePopupexist = true;
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You session will expire in ' + countdown + ' seconds! '
      console.log(this.idleState);
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.appService.getUserLoggedIn().subscribe(userLoggedIn => {
      if (userLoggedIn) {
        idle.watch()
        this.timedOut = false;
      } else {
        idle.stop();
      }
    })

    // this.reset();

  }

  ngOnInit() {
    console.log("app is loading")
    let data = sessionStorage.getItem('useraccount');
    if (data != null || undefined) {
      console.log("Not firsttime")
      this.appService.setUserLoggedIn(true);
    }
    try {
      this._http.get(this.urljson).subscribe(
        response => {
          this.responseData = response;
          let webserviceURL = this.responseData.webserviceURL;
          let sessiontime = this.responseData.sessionTimeOut;
          localStorage.setItem("webserviceURL", webserviceURL);
          // localStorage.setItem("sessiontime", sessiontime);
          this.apiservice.geturl();
          console.log(sessiontime);
          this.idle.setIdle(sessiontime * 60)
          this.idle.setTimeout(10);

        }
      )
    }
    catch (error) {
      console.log(error);
    }

  }

  //---------------------- session timeout-------------------------------------



  public reset() {
    this.idle.watch();
    this.timedOut = false;
  }

  public hideChildModal(): void {
    this.bsmodelRef.hide();

  }

  public stay() {
    this.bsmodelRef.hide();
    this.reset();
  }

  public logout() {
    // this.childModal.hide();
    this.bsmodelRef.hide();

    this.appService.setUserLoggedIn(false);
    sessionStorage.clear();
    setTimeout(() => {
      this.router.navigateByUrl('login');
      this.modalService._hideModal(1);
    }, 100);

  }
  //---------------------------------------------------------
}

