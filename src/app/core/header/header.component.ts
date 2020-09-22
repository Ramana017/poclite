// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { BsModalRef } from 'ngx-bootstrap/modal/public_api';
// import { AppService } from 'src/app/services/app.service';
// import { ApiserviceService } from 'src/app/services/apiservice.service';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.sass']
// })
// export class HeaderComponent implements OnInit {

//   public userName;
//   public useraccount: any;
//   public heading: string;
//   public  userFlag:boolean;

//   modalRef: BsModalRef;

//   public activeclass: Array<boolean> = []

//   constructor(private router: Router, private appService: AppService, public apiService: ApiserviceService) { }

//   ngOnInit(): void {
//     var data = sessionStorage.getItem("useraccount");
//     this.useraccount = JSON.parse(data);
//     if (this.useraccount == undefined || null) {
//       console.log("headerts called")
//       this.router.navigateByUrl('login')
//       window.location.reload();
//     } else {
//       console.log(this.router.url)
//       if (this.router.url == '/charts') {
//         this.heading = "POC DashBoard"
//       } else if (this.router.url == '/summary') {
//         this.heading = "POC Call Management"
//       } else if (this.router.url == '/widgets') {
//         this.heading = "POC Home"
//       }
//       else {
//         this.heading = "PS Registration"
//       }
//       if (this.useraccount != undefined || null) {
//         this.userName = this.useraccount.userName;
//         (this.useraccount.priviledFlag=="schedule")||(this.useraccount.priviledFlag=="all")?this.userFlag=true:this.userFlag=false;

//       }
//     }
//   }
//   public logout() {
//     sessionStorage.removeItem('useraccount');
//     setTimeout(() => {
//       this.router.navigateByUrl('login');
//       this.appService.setUserLoggedIn(false);
//       sessionStorage.clear();
//     }, 100);

//   }

// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal/public_api';
import { AppService } from 'src/app/services/app.service';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { ZipcodeService } from 'src/app/services/zipcode.service';
import { UserdetailsService } from 'src/app/services/userdetails.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  public userName;
  public useraccount: any;
  public heading: string;
  public adminFlag:boolean;
  public showNotifOn = [];
  public batchLength = 0;

  modalRef: BsModalRef;
  IsShowHide: boolean = false;

  public activeclass: Array<boolean> = []

  constructor(private router: Router, public service: ZipcodeService, private appService: AppService,public userDetailService:UserdetailsService, public apiService: ApiserviceService) { }

  ngOnInit(): void {
    this.initialGetNotif();
    var data = sessionStorage.getItem("useraccount");
    this.useraccount = JSON.parse(data);

      console.log(this.router.url)
      if (this.router.url == '/charts') {
        this.heading = "POC DashBoard"
      } else if (this.router.url == '/summary') {
        this.heading = "POC Call Management"
      } else if (this.router.url == '/widgets') {
        this.heading = "POC Home"
      }
      else {
        this.heading = "PS Registration"
      }
      if (this.useraccount != undefined || null) {
        this.userName = this.useraccount.userName;
      }

  }
  // ngOnChanges(){
  //   this.initialGetNotif();
  // }
  public logout() {
    sessionStorage.removeItem('useraccount');
    setTimeout(() => {
      this.router.navigateByUrl('login');
      this.appService.setUserLoggedIn(false);
      sessionStorage.clear();
    }, 100);

  }
  // ngOnInit() {
  //   this.showNotif()
  // }
  badgeCount: number;

  clearCount() {
    this.badgeCount = 0;


  }
  notif;
  count = 0;
  notif1 = []

  onClick(event) {

    this.IsShowHide =! this.IsShowHide ;

  }

  showNotif() {
    setInterval(() => {

      this.getNotif();

    }, 5000000);
  }
  getNotif() {
    console.log("get notif inside fun");
    this.service.getNotifications()
      .subscribe(data => {
        if (this.batchLength == data.length) {
          console.log("get notif inside if")
            return;
        }
        else if(this.batchLength !== data.length){
          this.showNotifOn = data;
          console.log("get notif inside else")
        }
      });
  }
  initialGetNotif() {
    this.service.getNotifications()
      .subscribe(data => {
        this.showNotifOn = data;
        console.log(data)
        this.batchLength = this.showNotifOn.length;
        this.showNotif();
      });
  }
  notifAfterDismiss() {
    this.service.getNotifications()
      .subscribe(data => {
        this.showNotifOn = data;
        console.log(data)
      });
  }
  dismissNotif(ind){
    this.showNotifOn.forEach((ele,i) => {
      if (ind === i) {
      //  this.showNotifOn.splice(i,1)
        console.log(ele,ind,i)
        const delIndex= ele.id
        console.log(delIndex)
        this.service.stopNotifications(delIndex) .subscribe(data => {
          console.log(data)
          this.initialGetNotif();
        })
      }

    });

  }

}
