import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import swal from 'sweetalert2'
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  //global variables
  public loginForm: FormGroup;
  public formError: boolean = false;
  public ShowPassword: boolean = false;
  public loginFailed: boolean = false;
  public responsedata: any;

  constructor(private _fb: FormBuilder, private _router: Router, public apiservice: ApiserviceService,private appService:AppService) { }

  ngOnInit(): void {
    console.log("working");
    var accountdetails:any=JSON.parse(sessionStorage.getItem('useraccount'));
    if(accountdetails!=null||undefined){
      // this._router.navigateByUrl('summary')
      console.log("#########$$$$$$$$$", accountdetails.priviledFlag =="all"|| accountdetails.priviledFlag=="schedule")
      accountdetails.priviledFlag =="all"||accountdetails.priviledFlag=="schedule"? this._router.navigateByUrl('summary'): this._router.navigateByUrl('widgets')

    }else{

}
      this.loginForm = this._fb.group({
        email: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required])
      })

  }
  // to validate form inputs
  get form() {
    return this.loginForm.controls;
  }

  // method used for login and call API
  public login() {
    this.formError = true;
    if (this.loginForm.valid) {
      // this._router.navigateByUrl('summary')
      // console.log(this.loginForm.value);
      var jsondata = { "loginId": this.loginForm.value.email, "password": this.loginForm.value.password }
      var parameters = JSON.stringify(jsondata);
      console.log(parameters);
      try {
        this.apiservice.authenticateUser(parameters).subscribe(
          response => {
            console.log(response);
            this.responsedata = response;
            if (this.responsedata.validateFlag == 1) {
              this.loginFailed = true;
              let errormessage=this.responsedata.errorMsg;
              swal.fire({
                title:"Login failed",
                html:errormessage,
                icon: "error",
                confirmButtonText: 'OK',

              })

            } else {
              this.loginFailed = false;
              this.appService.setUserLoggedIn(true)
              sessionStorage.setItem('useraccount', JSON.stringify(this.responsedata));
              this.responsedata.priviledFlag=="all"||this.responsedata.priviledFlag=="schedule"? this._router.navigateByUrl('summary'): this._router.navigateByUrl('widgets')


            }

          }
        )

      }
      catch (error) {
        console.log(error);
      }




    }
  }

  //method to show password

  public showpassword() {
    this.ShowPassword = !this.ShowPassword;
  }


}
