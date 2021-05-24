import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, EventEmitter, Output, NgZone } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import swal from 'sweetalert2';
import { AgmMap, ControlPosition, LazyMapsAPILoaderConfigLiteral, MapsAPILoader, MapTypeControlOptions, MapTypeId } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { google } from "google-maps";

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

  constructor(private _fb: FormBuilder, public datepipe: DatePipe, public apiservice: ApiserviceService, public bsmodelRef: BsModalRef,
    private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

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
  public redicon = "assets/images/locationRed.svg";
  public greenicon = "assets/images/locationgreen.svg";
  public blueicon = "assets/images/locationblue.svg";

  public centerlatitude: number;
  public centerlangutide: number;
  private psLongitude: number;
  private psLatitude: number;
  public clockInVariance: number;
  public clockOutVariance: number;

  private exceptionCount: number;

  public clockinDone: boolean = true;
  public clockOutDone: boolean = true;
  public clockInComments: string = "";
  public clockOutComments: string = "";
  public geoCoordResultsIdRadio: number;
  public googleFormattedAddress: string = '';

  public geoCoordinatesRange: any = {};
  public psAddress: any = { Longitude: '', Latitude: '', zipCode: '', };


  public gpsAcceptReasonList = [];
  public clockOutGpsAcceptReasonsId: number = null;
  public clockInGpsAcceptReasonsId: number = null;


  public arrGpsAcceptedBy;
  public arrGpsAcceptedOn;
  public depGpsAcceptedBy;
  public depGpsAcceptedOn;

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
    this.locations = [];
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
          this.geoCoordResultsId = this.getResponseData.geoCoordResultsId;
          this.clockInGpsAcceptReasonsId = this.getResponseData.clockInGpsAcceptReasonsId == 0 ? null : this.getResponseData.clockInGpsAcceptReasonsId;
          this.clockOutGpsAcceptReasonsId = this.getResponseData.clockOutGpsAcceptReasonsId == 0 ? null : this.getResponseData.clockOutGpsAcceptReasonsId;
          this.clockInComments = this.getResponseData?.clockInGpsAcceptComments;
          this.clockOutComments = this.getResponseData?.clockOutGpsAcceptComments;
          this.gpsAcceptReasonList = this.getResponseData.gpsAcceptReasonList;
          this.arrGpsAcceptedBy = this.getResponseData.arrGpsAcceptedBy;
          this.arrGpsAcceptedOn = this.getResponseData.arrGpsAcceptedOn;
          this.depGpsAcceptedBy = this.getResponseData.depGpsAcceptedBy;
          this.depGpsAcceptedOn = this.getResponseData.depGpsAcceptedOn;
          this.defaultpsdetails();

          let clockinObj = { latitude: this.clockInLatitude, longitude: this.clockInLongitude, address: this.clockInAddress, type: 'clockin' }
          // let obj = [this.clockInLatitude, this.clockInLongitude, this.clockInAddress,this.arrivalgpsErr == true?this.redicon:this.greenicon]
          this.locations.push(clockinObj)
          let clockOutObj = { latitude: this.clockOutLatitude, longitude: this.clockOutLongitude, address: this.clockOutAddress, type: 'clockout' }
          // let obj = [this.clockOutLatitude, this.clockOutLongitude, this.clockOutAddress,this.depgpsErr == true?this.redicon:this.greenicon]
          this.locations.push(clockOutObj)

          for (let i = 0; i < this.psAddressList.length; i++) {
            if (this.psAddressId == this.psAddressList[i].psAddressId) {
              this.centerlatitude = +this.psAddressList[i].latitude;
              this.centerlangutide = +this.psAddressList[i].longitude;
              this.psLatitude = +this.psAddressList[i].latitude;
              this.psLongitude = +this.psAddressList[i].longitude;
              let psObj = { psAddressId: this.psAddressList[i].psAddressId, latitude: this.psAddressList[i].latitude, longitude: this.psAddressList[i].longitude, address: this.psAddressList[i].address, type: 'ps' }
              this.locations.push(psObj);
            }
          }

        }, error => {

          console.log(error);
          swal.fire({
            title: 'Error',
            text: 'Failed to load',
            icon: "error",
            confirmButtonText: 'OK',
          })
        }
      )


    }
    catch (error) { }
  }

  public acceptGpsException(event: string) {
    let clockinflag = event == "clockin" ? 1 : 0;
    let clockOutFlag = event == "clockout" ? 1 : 0;
    let acceptreason: boolean;
    if (event == 'clockin') {
      this.clockInGpsAcceptReasonsId == null || this.clockInGpsAcceptReasonsId == 0 ? acceptreason = false : acceptreason = true;
    } else {
      this.clockOutGpsAcceptReasonsId == null || this.clockOutGpsAcceptReasonsId == 0 ? acceptreason = false : acceptreason = true;
    }
    let commentLength = clockinflag == 1 ? this.clockInComments?.trim().length : this.clockOutComments?.trim().length;
    console.log(commentLength)
    if (commentLength > 0 && acceptreason) {
      var jsonObj = {
        "id": this.jsonData.id, "clockInComments": clockinflag == 1 ? this.clockInComments : '', "clockOutComments": clockOutFlag == 1 ? this.clockOutComments : "", "visitDetailsId": this.jsonData.visitDetailsId, "clockInFlag": clockinflag, "clockOutFlag": clockOutFlag, "userId": this.userId,
        clockInGpsAcceptReasonsId: clockinflag == 1 ? this.clockInGpsAcceptReasonsId : 0, clockOutGpsAcceptReasonsId: clockOutFlag == 1 ? this.clockOutGpsAcceptReasonsId : 0
      }
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
                confirmButtonText: 'OK',
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
            } else {
              this.getGpsExceptionData();
            }

          }
        )
      }
      catch (error) {
        console.log(error);
      }
    } else {
      let str = [];
      let data = event == "clockin" ? " Clock In" : " Clock Out";
      if (commentLength == 0 || commentLength == undefined) {
        str.push(`enter ${data} Comments`)

      }
      if (!acceptreason) {
        str.push(`select ${commentLength == 0 || commentLength == undefined ? '' : data} Verification Method `)

      }


      swal.fire({
        title: "Invalid Comments",
        text: `Please ${str.join(" and ")} before accepting the Exception`,
        icon: "warning",
        confirmButtonText: 'OK',
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
              confirmButtonText: 'OK',
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
              confirmButtonText: 'OK',
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
              confirmButtonText: 'OK',
              allowOutsideClick: false
            }).then(ok => {
              this.apiservice.updateTable.next(true);
              this.bsmodelRef.hide();
            })
          } else {
            swal.fire({
              text: "Data saved failed",
              icon: "error",
              confirmButtonText: 'OK',
              allowOutsideClick: false
            })
          }

        },
        error => {
          console.log(error);
          console.log(error);
          swal.fire({
            text: "Failed to Save Data",
            icon: "error",
            confirmButtonText: 'OK',
            allowOutsideClick: false
          })

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
    this.googleFormattedAddress=event?.googleFormattedAddress;

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
    console.log("psaddressclock");
    // console.log(+this.locations[2].latitude)
    this.locations[2] = { latitude: +this.locations[2].latitude, longitude: +this.locations[2].longitude, address: this.locations[2].address, type: 'ps' }
    this.centerlatitude = +this.locations[2].latitude;
    this.centerlangutide = +this.locations[2].longitude;
    this.map.centerChange;
  }
  public clockInAddressClick(): void {
    console.log("clockin address")
    this.locations[0] = { latitude: this.clockOutLatitude, longitude: this.clockOutLongitude, address: this.clockOutAddress, type: 'clockout' }
    this.locations[1] = { latitude: this.clockInLatitude, longitude: this.clockInLongitude, address: this.clockInAddress, type: 'clockin' }


    this.centerlatitude = this.clockInLatitude;
    this.centerlangutide = this.clockInLongitude;
    this.map.centerChange;

  }

  public clockOutAddressClick(): void {

    this.locations[1] = { latitude: this.clockOutLatitude, longitude: this.clockOutLongitude, address: this.clockOutAddress, type: 'clockout' }
    this.locations[0] = { latitude: this.clockInLatitude, longitude: this.clockInLongitude, address: this.clockInAddress, type: 'clockin' }

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
          confirmButtonText: 'OK',

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
        text: "Please Enter all Feilds",
        icon: "warning",
        confirmButtonText: 'OK',

      })
    }
    else {
      let latitutde: string = this.psAddress.Latitude.trim();
      let longitude: string = this.psAddress.Longitude.trim();
      if (latitutde.length == 0 || longitude.length == 0) {
        swal.fire({
          title: "Invalid Details",
          text: "Please Enter all Feilds",
          icon: "warning",
          confirmButtonText: 'OK',

        })
      }
      if ((+latitutde) >= (+this.geoCoordinatesRange.minLatitude) && (+latitutde) <= (+this.geoCoordinatesRange.maxLatitude)) {
        latitudeFlag = true;
      } else {
        swal.fire({
          title: "Invalid Latitude",
          text: "Latitude should between " + this.geoCoordinatesRange.minLatitude + ' and ' + this.geoCoordinatesRange.maxLatitude,
          icon: "warning",
          confirmButtonText: 'OK',

        })
      }
      console.log("############", (+longitude) >= (+this.geoCoordinatesRange.minLongitude), (+longitude) <= (+this.geoCoordinatesRange.maxLongitude), (+longitude) <= (+this.geoCoordinatesRange.maxLongitude) && (+longitude) >= (+this.geoCoordinatesRange.minLongitude))
      if ((+longitude) >= (+this.geoCoordinatesRange.minLongitude) && (+longitude) <= (+this.geoCoordinatesRange.maxLongitude)) {
        longitudeFlag = true;
      } else {
        swal.fire({
          title: "Invalid Longitude",
          text: "Longitude should between " + this.geoCoordinatesRange.minLongitude + ' and ' + this.geoCoordinatesRange.maxLongitude,
          icon: "warning",
          confirmButtonText: 'OK',

        })
      }
      console.log(this.psAddress.suite)
      if (latitudeFlag && longitudeFlag) {
        this.manualAddress = this.psAddress.street + ',' + this.psAddress.city + ',' + this.psAddress.stateName + ',' + this.psAddress.zipCode;
        this.manualLatitude = latitutde;
        this.manualLongitude = longitude;
        this.savebutton = false
        this.fomatAddressManualInput = true;
        $('#exampleModalCenter').modal('hide')

      }

    }

    console.log(this.psAddress)
  }



  public editpsAdreesButton: boolean = false;

  public editMarkerPsAddress: any;
  public editMarkerObj = {
    "formattedAddress": "",
    "latitude": null,
    "longitude": null,
    "street": null,
    "suite": '',
    "city": null,
    "stateName": null,
    "zipCode": null,
  }
  public onmarkerDrag(event, type) {
    this.editMarkerObj = {
      "formattedAddress": "",
      "latitude": null,
      "longitude": null,
      "street": null,
      "suite": '',
      "city": null,
      "stateName": null,
      "zipCode": null,
    }
    console.log(event)
    let lat = event.coords.lat;
    let lng = event.coords.lng;

    this.locations[2].latitude = lat;
    this.locations[2].longitude = lng;

    const geocoder = new google.maps.Geocoder();
    const latlng = new google.maps.LatLng(lat, lng);
    const request = {
      location: latlng
    };
    let address: any;

    geocoder.geocode(request, (results, status) => {
      console.log(status)
      if (status == "OK") {
        // console.log(request, results);
        // console.log(results[0].formatted_address);
        address = results[0].formatted_address;
        // console.log(results[0].address_components[5]?.long_name)
        results[0].address_components.map(x => {
          console.log(x.long_name)

          console.log(type, address);
          this.locations[2].address = address;
          // this.psaddressTxtArea = address + '  ,lat: ' + lat + " lng: " + lng;
          this.psaddressTxtArea = address;
          console.log(this.psaddressTxtArea)
          x.types.map(y => {
            if (y == "postal_code") {
              this.editMarkerObj.zipCode = x.long_name;
              console.log(x.long_name)
            }
            if (y == "administrative_area_level_1") {
              this.editMarkerObj.stateName = x.short_name;
              console.log(x.short_name);
            }
            if (y == "administrative_area_level_2") {
              this.editMarkerObj.city = x.long_name;
              console.log(x.long_name);
            }
          })

        })
        this.editMarkerObj.formattedAddress = results[0].formatted_address
        this.editMarkerObj.latitude = event.coords.lat;
        this.editMarkerObj.longitude = event.coords.lng;
        this.editMarkerObj.street = this.editMarkerObj.formattedAddress?.split(',')[0];
        console.log(this.editMarkerObj.formattedAddress.split(','))
      } else {
        this.locations[2].address = "Invalid Address"
      }
      console.log("final object after drag", this.editMarkerObj)


    });
  }
  public savepsAddreess() {
    let obj = { "psAddressId": this.psAddressId }
    let psAddessId=0;
    if (this.editMarkerObj.zipCode != null) {
      this.apiservice.getPSAddressData(JSON.stringify(obj)).subscribe(res => {
        console.log(res);
        psAddessId=res.psAddress.id;
        this.geoCoordinatesRange = res.geoCoordinatesRange;
        let latitudeFlag = false;
        let longitudeFlag = false;
        let latitutde: string = this.locations[2].latitude;
        let longitude: string = this.locations[2].longitude;
        if ((+latitutde) >= (+this.geoCoordinatesRange.minLatitude) && (+latitutde) <= (+this.geoCoordinatesRange.maxLatitude)) {
          latitudeFlag = true;
        } else {
          swal.fire({
            title: "Invalid Latitude",
            text: "Latitude should between " + this.geoCoordinatesRange.minLatitude + ' and ' + this.geoCoordinatesRange.maxLatitude,
            icon: "warning",
            confirmButtonText: 'OK',

          })
        }
        if ((+longitude) >= (+this.geoCoordinatesRange.minLongitude) && (+longitude) <= (+this.geoCoordinatesRange.maxLongitude)) {
          longitudeFlag = true;
        } else {
          swal.fire({
            title: "Invalid Longitude",
            text: "Longitude should between " + this.geoCoordinatesRange.minLongitude + ' and ' + this.geoCoordinatesRange.maxLongitude,
            icon: "warning",
            confirmButtonText: 'OK',

          })
        }
        console.log(this.psAddress.suite)
        if (latitudeFlag && longitudeFlag) {

          var jsonObj = {
            "id": this.jsonData.id, "visitDetailsId": this.jsonData.visitDetailsId, "geoCoordId": this.psGeoCoordId, "geoCoordResultsId": this.geoCoordResultsId, "formattedAddress": this.editMarkerObj.formattedAddress, "latitude": this.editMarkerObj.latitude, "longitude": this.editMarkerObj.longitude, "userId": this.userId, "street": this.editMarkerObj.street, "suite": this.editMarkerObj.suite, "city": this.editMarkerObj.city, "stateId": 0, "zipCode": this.editMarkerObj.zipCode, "addressId": psAddessId, "stateCode": this.editMarkerObj.stateName
          };
          console.log(jsonObj)
          try {
            this.apiservice.saveFormatAddress(JSON.stringify(jsonObj)).subscribe(
              response => {
                console.log(response);
                this.saveResponseData = response;
                if (this.saveResponseData.validateFlag == 0) {
                  swal.fire({
                    text: "Data saved successfully",
                    icon: "success",
                    confirmButtonText: 'OK',
                    allowOutsideClick: false
                  }).then(ok => {
                    this.editpsAdreesButton = false;
                    this.getGpsExceptionData()
                  })
                } else {
                  swal.fire({
                    text: "Data saved failed",
                    icon: "error",
                    confirmButtonText: 'OK',
                    allowOutsideClick: false
                  })
                }

              },
              error => {
                console.log(error);
                swal.fire({
                  text: "Failed to Save Data",
                  icon: "error",
                  confirmButtonText: 'OK',
                  allowOutsideClick: false
                })

              }
            )
          }
          catch (error) {
            console.log(error);
          }



        }


      })
    } else {
      swal.fire({
        title: 'Invalid ',
        text: `Invalid Address Format - ${this.editMarkerObj.formattedAddress} `,
        icon: "warning",
        confirmButtonText: 'OK',
      })
    }
  }
  public psaddressTxtArea = '';


}
export function agmConfigFactory(value, config?: LazyMapsAPILoaderConfigLiteral) {
  config.apiKey = value;
}


