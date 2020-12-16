import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import swal from 'sweetalert2';
import { AgmMap, ControlPosition, LazyMapsAPILoaderConfigLiteral, MapTypeControlOptions, MapTypeId } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any;


@Component({
  selector: 'app-gpsdescrepancy',
  templateUrl: './gpsdescrepancy.component.html',
  styleUrls: ['./gpsdescrepancy.component.sass']
})
export class GpsdescrepancyComponent implements OnInit, AfterViewInit {
  @ViewChild(AgmMap, { static: true }) map: AgmMap;
  @Output()
  popupUpdate: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _fb: FormBuilder, public datepipe: DatePipe, public apiservice: ApiserviceService, public bsmodelRef: BsModalRef) { }

  public psName: string;
  public DcsName: string;
  public procedureCode: string;
  public scheduleStartDate: string;
  public scheduleEndDate: string;
  public scheduleStartTime: string;
  public scheduleEndTime: string;
  public jsonData: any;
  public psAddressId;
  public getResponseData: any;
  public updateResponseData: any;
  public saveResponseData: any;
  public clockInAddress: string;
  public clockInLongitude: number;
  public clockInLatitude: number;
  public clockOutAddress: string;
  public clockOutLongitude: number;
  public clockOutLatitude: number;
  public psFormatAddressList: Array<any> = [];
  public psAddressList: Array<any>;
  public psGeoCoordId: number;
  public geoCoordResultsId: number = 0;
  public gpsSystemPref: number;
  public arrivalgpsErr: boolean = false;
  public depgpsErr: boolean = false;
  public psDetailsSelected: any;
  public userId: number;
  public savebutton: boolean = true;
  public manualAddress: string;
  public manualLatitude: string;
  public manualLongitude: string;
  public fomatAddressManualInput: boolean = false;
  public selectedAddress: string;
  public selectedLatitude: string;
  public selectedLongitude: string;
  public psdetailsSelectedAddress: string;
  public psdetailsSelectedLatitude: string;
  public psdetailsSelectedLongitude: string;
  public useraccount: any;

  public arrivalgpsErrview: boolean = false;
  public depgpserrview: boolean = false;
  public locations: Array<any> = [];
  public redicon = "assets/images/red-dot.png"
  public greenicon = "assets/images/green-dot.png";

  public centerlatitude: number;
  public centerlangutide: number;
  private psLongitude: number;
  private psLatitude: number;
  public clockInVariance: number;
  public clockOutVariance: number;

  private exceptionCount: number;

  public clockinDone: boolean = true;
  public clockOutDone: boolean = true;
  public clockInComments: string = " ";
  public clockOutComments: string = " ";
  public geoCoordResultsIdRadio: number;
  public googleFormattedAddress: string = '';

  public geoCoordinatesRange: any = {};
  public psAddress: any = { Longitude: '', Latitude: '', zipCode: '', };



  public ngOnInit(): void {
    console.log('gps oninit working');
    this.displayData();
    this.getGpsExceptionData();
  }
  public ngAfterViewInit() {

  }

  public displayData(): void {
    var userlist = localStorage.getItem('userlist');
    this.jsonData = JSON.parse(userlist);
    console.log(this.jsonData);
    var useraccount = sessionStorage.getItem('useraccount');
    this.useraccount = JSON.parse(useraccount);
    this.userId = this.useraccount.userId;

    this.DcsName = this.jsonData.dcsName;
    this.psName = this.jsonData.psName;
    this.procedureCode = this.jsonData.procedureCode;
    // this.scheduleStartDate = this.datepipe.transform(this.jsonData.scheduledBeginDateTime, 'MM/dd/yyyy');
    // this.scheduleStartTime = this.datepipe.transform(this.jsonData.scheduledBeginDateTime, 'shortTime');
    // this.scheduleEndDate = this.datepipe.transform(this.jsonData.scheduledEndDateTime, 'MM/dd/yyyy');
    // this.scheduleEndTime = this.datepipe.transform(this.jsonData.scheduledEndDateTime, 'shortTime');
    this.scheduleStartDate = this.jsonData.scheduledBeginDateTime;
    this.scheduleEndDate = this.jsonData.scheduledEndDateTime;
    this.psAddressId = this.jsonData.psAddressId;
    this.exceptionCount = this.jsonData.exceptionCount;



    if (this.jsonData.ArrGpsException == 1) {
      console.log("arrival exception came");
      this.arrivalgpsErr = true;
      this.arrivalgpsErrview = true;
    }
    else {
      if (this.jsonData.ArrGpsException == 3) {
        this.clockinDone = false;
      }
      this.arrivalgpsErr = false;
      this.arrivalgpsErrview = false;
    }
    if (this.jsonData.DepGpsException == 1) {
      console.log("departure exception came");
      this.depgpsErr = true;
      this.depgpserrview = true;
    }
    else {
      if (this.jsonData.DepGpsException == 3) {
        this.clockOutDone = false;
      }
      this.depgpsErr = false;
      this.depgpserrview = false;
    }

  }
  public getGpsExceptionData() {

    let jsonObj =
      { "psId": this.jsonData.psId, "visitDetailsId": this.jsonData.visitDetailsId, "arrGpsException": this.jsonData.ArrGpsException, "depGpsException": this.jsonData.DepGpsException, "officeId": this.jsonData.officeId, "arrivalId": this.jsonData.arrivalId, "departureId": this.jsonData.departureId, "psAddressId": this.jsonData.psAddressId }
    let parameters = JSON.stringify(jsonObj);
    console.log(parameters);
    try {

      this.apiservice.getGpsExceptionData(parameters).subscribe(
        response => {
          console.log(response);
          this.getResponseData = response;
          this.gpsSystemPref = this.getResponseData.gpsSystemPref;
          this.clockInAddress = this.getResponseData.clockInAddress;
          this.clockInLatitude = +this.getResponseData.clockInLatitude;
          this.clockInLongitude = +this.getResponseData.clockInLongitude;
          this.clockOutAddress = this.getResponseData.clockOutAddress;
          this.clockOutLatitude = +this.getResponseData.clockOutLatitude;
          this.clockOutLongitude = +this.getResponseData.clockOutLongitude;
          this.psGeoCoordId = this.getResponseData.psGeoCoordId;
          this.psAddressList = this.getResponseData.psAddressList;
          this.psFormatAddressList = this.getResponseData.psFormatAddressList;
          this.clockInVariance = this.getResponseData.clockInVariance;
          this.clockOutVariance = this.getResponseData.clockOutVariance;
          this.geoCoordResultsIdRadio = this.getResponseData.geoCoordResultsId;
          this.defaultpsdetails();

          if (this.arrivalgpsErr == true) {
            let obj = [this.clockInLatitude, this.clockInLongitude, this.clockInAddress, this.redicon]
            this.locations.push(obj)
          }
          if (this.depgpsErr == true) {
            let obj = [this.clockOutLatitude, this.clockOutLongitude, this.clockOutAddress, this.redicon]
            this.locations.push(obj)
          }
          for (let i = 0; i < this.psAddressList.length; i++) {
            if (this.psAddressId == this.psAddressList[i].psAddressId) {
              this.centerlatitude = +this.psAddressList[i].latitude;
              this.centerlangutide = +this.psAddressList[i].longitude;
              this.psLatitude = +this.psAddressList[i].latitude;
              this.psLongitude = +this.psAddressList[i].longitude;
              let obj = [this.psAddressList[i].latitude, this.psAddressList[i].longitude, this.psAddressList[i].address, this.greenicon]
              this.locations.push(obj);
            }
          }

        }, error => {

          console.log(error);
          swal.fire({
            title: 'Error',
            text: 'Failed to load',
            icon: "error",
            confirmButtonText: 'Ok',
          })
        }
      )


    }
    catch (error) { }
  }

  public acceptGpsException(event: string) {
    let clockinflag = event == "clockin" ? 1 : 0;
    let clockOutFlag = event == "clockout" ? 1 : 0;
    let commentLength = clockinflag == 1 ? this.clockInComments.trim().length : this.clockOutComments.trim().length;
    if (commentLength > 0) {
      var jsonObj = { "id": this.jsonData.id, "clockInComments": clockinflag == 1 ? this.clockInComments : '', "clockOutComments": clockOutFlag == 1 ? this.clockOutComments : "", "visitDetailsId": this.jsonData.visitDetailsId, "clockInFlag": clockinflag, "clockOutFlag": clockOutFlag, "userId": this.userId }
      var parameters = JSON.stringify(jsonObj)
      try {
        this.apiservice.acceptGpsException(parameters).subscribe(
          response => {
            console.log(response);
            this.arrivalgpsErr = event == "clockin" ? false : this.arrivalgpsErr;
            this.depgpsErr = event == "clockout" ? false : this.depgpsErr;
            if (this.arrivalgpsErr == false && this.depgpsErr == false) {
              swal.fire({
                text: "Accepted successfully",
                icon: "success",
                confirmButtonText: 'Ok',
                allowOutsideClick: false
              }).then(ok => {
                let merged = { ...this.jsonData, ...response };
                if (this.apiservice.checkException(merged)) {
                  this.popupUpdate.emit();
                } else {
                  this.apiservice.updateTable.next(true);
                  this.bsmodelRef.hide();
                }

              })
            }

          }
        )
      }
      catch (error) {
        console.log(error);
      }
    } else {
      let data = event == "clockin" ? " Clock In" : " Clock Out";
      swal.fire({
        title: "Invalid Comments",
        text: "Please Enter" + data + " comments before Accept",
        icon: "warning",
        confirmButtonText: 'Ok',
      })
    }


  }
  public updateGpsException() {
    var jsonObj = { "psAddressId": this.psAddressId, "visitDetailsId": this.jsonData.visitDetailsId, "userId": this.userId };
    var parameters = JSON.stringify(jsonObj);
    try {
      this.apiservice.updateGpsException(parameters).subscribe(
        response => {
          console.log(response);
          this.updateResponseData = response;
          var response2 = JSON.stringify(response);
          // alert(response2);
          if (this.updateResponseData.validateFlag == 0) {
            swal.fire({
              text: "Updated successfully",
              icon: "success",
              confirmButtonText: 'Ok',
              allowOutsideClick: false
            }).then(OK => {
              let merged = { ...this.jsonData, ...response };
              if (this.apiservice.checkException(merged)) {
                this.popupUpdate.emit();
              } else {
                this.apiservice.updateTable.next(true);
                this.bsmodelRef.hide();
              }
            })
          }
          else {
            swal.fire({
              text: "Updated failed",
              icon: "error",
              confirmButtonText: 'Ok',
              allowOutsideClick: false
            })
          }

        }, error => {
          console.log(error)
        }
      )
    }
    catch (error) {
      console.log(error);
    }


  }
  public saveFormatAddress() {
    //  addressId
    // street
    // suite
    // city
    // stateId
    // zipCode


    var formattedAddress = this.fomatAddressManualInput ? this.manualAddress != undefined || null ? this.manualAddress : " " : this.selectedAddress;
    var latitude = this.fomatAddressManualInput ? this.manualLatitude != undefined || null ? this.manualLatitude : " " : this.selectedLatitude;
    var longitude = this.fomatAddressManualInput ? this.manualLongitude != undefined || null ? this.manualLongitude : " " : this.selectedLongitude;
    var jsonObj = {
      "id": this.jsonData.id, "visitDetailsId": this.jsonData.visitDetailsId, "geoCoordId": this.psGeoCoordId, "geoCoordResultsId": this.geoCoordResultsId, "formattedAddress": formattedAddress, "latitude": latitude, "longitude": longitude, "userId": this.userId, "street": this.fomatAddressManualInput ? this.psAddress.street : '', "suite":
        this.fomatAddressManualInput ? this.psAddress.suite : '', "city": this.fomatAddressManualInput ? this.psAddress.city : '', "stateId": this.fomatAddressManualInput ? this.psAddress.stateId : '', "zipCode": this.fomatAddressManualInput ? this.psAddress.zipCode : '', "addressId": this.fomatAddressManualInput ? this.psAddress.id : ''
    };
    var parameters = JSON.stringify(jsonObj);
    console.log(parameters);
    try {
      this.apiservice.saveFormatAddress(JSON.stringify(jsonObj)).subscribe(
        response => {
          console.log(response);
          var response2 = JSON.stringify(response);
          // alert(response2);
          this.saveResponseData = response;
          if (this.saveResponseData.validateFlag == 0) {
            swal.fire({
              text: "Data saved successfully",
              icon: "success",
              confirmButtonText: 'Ok',
              allowOutsideClick: false
            }).then(ok => {
              this.apiservice.updateTable.next(true);
              this.bsmodelRef.hide();
            })
          } else {
            swal.fire({
              text: "Data saved failed",
              icon: "error",
              confirmButtonText: 'Ok',
              allowOutsideClick: false
            })
          }

        },
        error => {
          console.log(error);

        }
      )
    }
    catch (error) {
      console.log(error);
    }

  }

  ///optional

  public psdetails(event): void {
    this.psDetailsSelected = event;
    console.log(event);
    this.psdetailsSelectedAddress = event.address;
    this.psdetailsSelectedLatitude = event.latitude;
    this.psdetailsSelectedLongitude = event.longitude;
    this.psAddressId = event.psAddressId;

  }

  public defaultpsdetails(): void {
    for (let i = 0; i < this.psAddressList.length; i++) {
      if (this.psAddressList[i].psAddressId == this.psAddressId) {
        this.psdetailsSelectedAddress = this.psAddressList[i].address;
        this.psdetailsSelectedLatitude = this.psAddressList[i].latitude;
        this.psdetailsSelectedLongitude = this.psAddressList[i].longitude;
        this.googleFormattedAddress = this.psAddressList[i].googleFormattedAddress;
      }
    }
  }
  public fomataddresschange(event): void {
    this.savebutton = false;
    this.fomatAddressManualInput = false;
    this.selectedAddress = event.formattedAddress;
    this.selectedLatitude = event.latitude;
    this.selectedLongitude = event.longitude;
    this.geoCoordResultsId = event.geoCoordResultsId;
    console.log(this.selectedAddress, this.selectedLatitude, this.selectedLongitude);

    console.log(event)
  }
  public manualFormatAddress(): void {
    console.log("dddddd")
    this.savebutton = false
    this.fomatAddressManualInput = true;
  }

  public psAddressClick(): void {
    console.log("psaddressclock")
    this.centerlatitude = +this.psLatitude;
    this.centerlangutide = +this.psLongitude;
    this.map.centerChange;
  }
  public clockInAddressClick(): void {
    console.log("clockin address")

    this.centerlatitude = this.clockInLatitude;
    this.centerlangutide = this.clockInLongitude;
    this.map.centerChange;

  }

  public clockOutAddressClick(): void {
    this.centerlatitude = this.clockOutLatitude;
    this.centerlangutide = this.clockOutLongitude;
    this.map.centerChange;
  }
  public agmConfigFactory1(value, config?: LazyMapsAPILoaderConfigLiteral) {
    config.apiKey = value;
  }
  public radiobuttonactive() {
    document.getElementById('format0').click()
  }
  public openmodal(modaId) {
    this.savebutton = true;
    this.fomatAddressManualInput = false;
    let obj = { "psAddressId": this.psAddressId }
    this.apiservice.getPSAddressData(JSON.stringify(obj)).subscribe(res => {
      console.log(res);
      this.geoCoordinatesRange = res.geoCoordinatesRange;
      this.psAddress = res.psAddress
      this.zipCode(false, this.psAddress.zipCode)
      $(modaId).modal('show')
    })
  }

  public popupForm: FormGroup;
  createform() {
    this._fb.group({
      address: new FormControl(null, [Validators.required]),
      address2: new FormControl(null),
      zipCode: new FormControl(null, [Validators.required]),
      stateName: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      latitude: new FormControl(null, [Validators.required]),
      longitude: new FormControl(null, [Validators.required])



    })
  }

  public zipCode(event, autoValue?) {
    // console.log(event)
    let trimmed = event ? event.target.value.replace(/\D/g, '') : autoValue;
    this.psAddress.zipCode = trimmed

    let value: string = trimmed
    // if (value.length == 5) {
    this.apiservice.getZipcodeDetails(value).subscribe(res => {
      console.log(res, Object.keys(res).length);

      if (Object.keys(res).length > 0) {
        this.psAddress.city = res.city;
        this.psAddress.stateName = res.state;
        this.psAddress.stateId = res.stateId;
        this.psAddress.zipCode = value;
      } else {
        swal.fire({
          title: "Invalid Zipcode",
          text: "Please Enter valid Zipcode",
          icon: "warning",
          confirmButtonText: 'Ok',

        })
        this.psAddress.zipCode = ''
      }
    })
    // }
  }
  savepopulate() {
    let latitudeFlag = false;
    let longitudeFlag = false;
    console.log(this.psAddress.zipCode.length > 1)
    console.log(this.psAddress.Latitude)
    console.log(this.psAddress.Longitude)
    if (this.psAddress.Latitude == undefined || this.psAddress.Longitude == undefined) {
      swal.fire({
        title: "Invalid Details",
        text: "Please Enter all Mandatory Feilds",
        icon: "warning",
        confirmButtonText: 'Ok',

      })
    }
    else {
      let latitutde: string = this.psAddress.Latitude.trim();
      let longitude: string = this.psAddress.Longitude.trim();
      if (latitutde.length == 0 || longitude.length == 0) {
        swal.fire({
          title: "Invalid Details",
          text: "Please Enter all Mandatory Feilds",
          icon: "warning",
          confirmButtonText: 'Ok',

        })
      }
      if ((+latitutde) >= (+this.geoCoordinatesRange.minLatitude) && (+latitutde) <= (+this.geoCoordinatesRange.maxLatitude)) {
        latitudeFlag = true;
      } else {
        swal.fire({
          title: "Invalid Latitude",
          text: "Latitude should between " + this.geoCoordinatesRange.minLatitude + ' and ' + this.geoCoordinatesRange.maxLatitude,
          icon: "warning",
          confirmButtonText: 'Ok',

        })
      }
      if ((+longitude) >= (+this.geoCoordinatesRange.minLongitude) && (+longitude) <= (+this.geoCoordinatesRange.maxLongitude)) {
        longitudeFlag = true;
      } else {
        swal.fire({
          title: "Invalid Longitude",
          text: "Longitude should between " + this.geoCoordinatesRange.minLongitude + ' and ' + this.geoCoordinatesRange.maxLongitude,
          icon: "warning",
          confirmButtonText: 'Ok',

        })
      }
      console.log(this.psAddress.suite)
      if (latitudeFlag && longitudeFlag) {
        this.manualAddress = this.psAddress.street + ','  + this.psAddress.city + ',' + this.psAddress.stateName + ',' + this.psAddress.zipCode;
        this.manualLatitude = latitutde;
        this.manualLongitude = longitude;
        this.savebutton = false
        this.fomatAddressManualInput = true;
        $('#exampleModalCenter').modal('hide')

      }

    }

    console.log(this.psAddress)
  }

}
export function agmConfigFactory(value, config?: LazyMapsAPILoaderConfigLiteral) {
  config.apiKey = value;
}


