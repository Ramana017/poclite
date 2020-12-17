import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ZipcodeService } from '../../../services/zipcode.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import swal from 'sweetalert2';
@Component({
  selector: 'app-ps-basic',
  templateUrl: './ps-basic.component.html',
  styleUrls: ['./ps-basic.component.sass'],
})
export class PsBasicComponent implements OnInit {
  // Variables used in guarantor edit form
  @Input() popup: boolean;
  modelref: BsModalRef;
  public psId: number = 0;
  // public officeList: any;
  public basicEditForm: FormGroup;
  public lookupDetails: any;
  public saluationList: any;
  public addressTypeList: any;
  public maritalStatusList: any;
  public LanguageList: any;
  public raceIdList: any;
  public phoneTypeList: any;
  public SaveResponse: any;
  public genderList: any;
  public Keyword = 'name';
  public locationName;
  public siteId: number;
  public zipDetails: any;
  private countryId: any;
  private stateId: any;
  private countyId: any;
  private timeZoneId: any;
  public siteSelectedItems = [];
  public userMappedOffices = [];
  public keyword1 = 'siteName';
  private basicPreviousDetails: any;
  private previousPsDetails: any;
  public dropdownSettings: object = {
    singleSelection: false,
    text: 'Site Name',
    enableSearchFilter: true,
    labelKey: 'siteName',
    primaryKey: 'id',
    class: 'checkbox-list',
    showCheckbox: true,
  };
  public currentDate: Date = new Date();
  public formError: boolean = false;
  private userId: number;
  public mappedArray: Array<any>;
  public siteList=[];
  constructor(
    private fb: FormBuilder,
    public modalService: BsModalService,
    public service: ZipcodeService,
    public date: DatePipe,
    private router: Router,
    private http: HttpClient
  ) {
    this.userId = this.service.getUserId();
    this.mappedArray = this.service.getUserId(true);
    this.newForm();
  }
  ngOnInit() {
    this.previousBasicInfo();
    this.basicDetails();
  }
  // Code for FormGroup and FormControlNames
  private newForm(): void {
    this.basicEditForm = this.fb.group({
      location: ['', Validators.required],
      phonetype: ['', Validators.required],
      phonetype2: [''],
      phonetype3: [''],
      maritalStatus: ['', Validators.required],
      race: ['', Validators.required],
      gender: ['', Validators.required],
      saluation: ['', Validators.required],
      saluationId: ['', Validators.required],
      middleName: [''],
      primelang: ['', Validators.required],
      site: [''],
      languageList: [''],
      languageId: [''],
      genderId: ['', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      raceId: ['', Validators.required],
      ssn: [''],
      addressLine1: ['',Validators.required],
      addressLine2: [''],
      number: ['', [Validators.required]],
      number2: [''],
      number3: [''],
      maritalStatusList: ['', Validators.required],
      addressTypeList: ['', Validators.required],
      phoneTypeList: ['', Validators.required],
      phoneTypeList2: [''],
      phoneTypeList3: [''],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
      zipFourCode: [''],
      country: ['', Validators.required],
      county: ['', Validators.required],
      state: ['', Validators.required],
      timeZone: ['', Validators.required],
      dob: ['', Validators.required],
      officeId: [ '', Validators.required],
      aliasName: [''],
      siteName: [''],
      fax: [''],
      email: [''],
      directions: [''],
    });
  }
  // Code for submitting the edited ps form
  get f() {
    return this.basicEditForm.controls;
  }
  // Code for saving the edited ps form
  public onSubmit(): void {
    console.log(this.basicEditForm.valid,this.basicEditForm.value);
    this.basicEditForm.get('dob').value > this.currentDate
      ? this.basicEditForm.get('dob').setValue(this.currentDate)
      : '';
    this.mappedArray = [];
    console.log(this.siteSelectedItems)
    this.formError = true;
    this.mappedArray =
      this.siteSelectedItems.length > 0
        ? this.siteSelectedItems.map((a) => a.siteName)
        : [0];
    console.log(this.mappedArray)
    let siteFlag = this.mappedArray.includes(this.siteId);
    if (this.basicEditForm.valid) {
      this.phoneValidation();
    } else if (
      this.basicEditForm.invalid ||
      this.siteSelectedItems.length == 0
    ) {
      swal.fire({
        title: 'Invalid Form',
        text: 'Fill all the Required fields',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
      });
      console.log(this.basicEditForm.value);
    } else if (!siteFlag) {
      swal.fire({
        title: 'Invalid Mapped Sites',
        text: 'Please select the Home Site',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
      });
    }
  }
  // Code for saving the edited ps form
  private saveBasic() {
    // const jsonObj = {
    //   psId: this.psId,
    //   saluationId: this.basicEditForm.value.saluationId,
    //   genderId: this.basicEditForm.value.genderId,
    //   lastName: this.basicEditForm.value.lastName,
    //   firstName: this.basicEditForm.value.firstName,
    //   raceId: this.basicEditForm.value.raceId,
    //   maritalStatusID: this.basicEditForm.value.maritalStatusList,
    //   dob: this.date.transform(this.basicEditForm.value.dob, 'MM/dd/yyyy'),
    //   ssn: this.basicEditForm.value.ssn.replace(/-/g, ''),
    //   languageId: +this.basicEditForm.value.languageId,
    //   locationId: this.basicEditForm.value.addressTypeList,
    //   city: this.basicEditForm.value.city,
    //   addressLine: this.basicEditForm.value.addressLine1,
    //   addressLine2: this.basicEditForm.value.addressLine2,
    //   zipcode: this.basicEditForm.value.zipcode,
    //   phoneTypeid: this.basicEditForm.value.phoneTypeList,
    //   phone: this.basicEditForm.value.number.replace(/-/g, ''),
    //   stateId: this.stateId,
    //   countyId: this.countyId,
    //   timeZoneId: this.timeZoneId,
    //   countryId: this.countryId,
    //   officeId: this.siteId,
    //   mappedOfficeIds: this.mappedArray.toString(),
    //   updatedUserId: this.userId,
    //   middleName: this.basicEditForm.value.middleName,
    //   aliasName: this.basicEditForm.value.aliasName,
    //   zip4Code: this.basicEditForm.value.zip4Code,
    //   phoneTypeid2: this.basicEditForm.value.phoneTypeid2,
    //   phone2: this.basicEditForm.value.number2.replace(/-/g, ''),
    //   phoneTypeid3: this.basicEditForm.value.phoneTypeid3,
    //   phone3: this.basicEditForm.value.number3.replace(/-/g, ''),
    //   fax: this.basicEditForm.value.fax,
    //   email: this.basicEditForm.value.email,
    //   directions: this.basicEditForm.value.directions,
    // };
    const jsonObj = {
      psId: 22854,
      saluationId: this.basicEditForm.value.saluationId,
      genderId: this.basicEditForm.value.genderId,
      lastName: this.basicEditForm.value.lastName,
      firstName: this.basicEditForm.value.firstName,
      raceId: this.basicEditForm.value.raceId,
      maritalStatusID: this.basicEditForm.value.maritalStatusList,
      dob: this.date.transform(this.basicEditForm.value.dob, 'MM/dd/yyyy'),
      ssn: this.basicEditForm.value.ssn.replace(/-/g, ''),

      languageId: +this.basicEditForm.value.languageId,
      locationId: this.basicEditForm.value.addressTypeList,
      city: this.basicEditForm.value.city,
      addressLine: this.basicEditForm.value.addressLine1,
      addressLine2: this.basicEditForm.value.addressLine2,
      zipcode: this.basicEditForm.value.zipcode,
      phoneTypeid: this.basicEditForm.value.phoneTypeList,
      phone: this.basicEditForm.value.number.replace(/-/g, ''),
      stateId:this.zipFlag ? this.stateId : this.basicPreviousDetails.stateId,
    //  stateId: this.stateId,
      countyId: this.zipFlag ? this.countyId : this.basicPreviousDetails.countyId ,
      timeZoneId: this.zipFlag ? this.timeZoneId : this.basicPreviousDetails.TIMEZONEID,
      countryId: this.zipFlag ? this.countryId : this.basicPreviousDetails.countryId,
      //   officeId: this.siteId,
      mappedOfficeIds: this.mappedArray.toString(),
      updatedUserId: this.userId,
      // middleName: this.basicEditForm.value.middleName,
      // aliasName: this.basicEditForm.value.aliasName,
      // zip4Code: this.basicEditForm.value.zip4Code,
      // phoneTypeid2: this.basicEditForm.value.phoneTypeid2,
      // phone2: this.basicEditForm.value.number2.replace(/-/g, ''),
      // phoneTypeid3: this.basicEditForm.value.phoneTypeid3,
      // phone3: this.basicEditForm.value.number3.replace(/-/g, ''),
      // fax: this.basicEditForm.value.fax,
      // email: this.basicEditForm.value.email,
      // directions: this.basicEditForm.value.directions,
      middleName: this.basicEditForm.value.middleName,
      aliasName: this.basicEditForm.value.aliasName,
      zip4Code: this.basicEditForm.value.zipFourCode,
      PHONETYPEID2: this.basicEditForm.value.phoneTypeid2,
      PHONETYPE2: this.basicEditForm.value.number2.replace(/-/g, ''),
      //PHONE2:
      PHONETYPEID3: this.basicEditForm.value.phoneTypeid3,
      PHONETYPE3: this.basicEditForm.value.number3.replace(/-/g, ''),
      //PHONE3:
      fax: this.basicEditForm.value.fax,
      email: this.basicEditForm.value.email,
      directions: this.basicEditForm.value.directions,
      officeId: this.basicEditForm.value.officeId
    };
    console.log(JSON.stringify(jsonObj));
    let parameters = JSON.stringify(jsonObj);
    localStorage.setItem('editPs', parameters);
    try {
      this.service.savePs(parameters).subscribe((res) => {
        this.SaveResponse = res;
        console.log(res, 'getting the psId details');
        // alert(JSON.stringify(this.SaveResponse));
        if (Object.keys(this.SaveResponse).length !== 0) {
          if (this.popup) {
            this.modelref.hide();
          } else {
            console.log(JSON.stringify(jsonObj));
            // sessionStorage.setItem(
            // 'psDetails',
            // JSON.stringify(this.SaveResponse)
            // );
            this.service.showSuccess('PS Updated Succssfully!');
          }
        }
      });
    } catch (error) { }
  }
  // Get lookups for the ps form
  public basicDetails() {
    this.service.getLookupsDataBasic().subscribe((data) => {
      this.lookupDetails = data;
      console.log(this.lookupDetails);
      this.LanguageList = this.lookupDetails.language;
      console.log(this.lookupDetails.language);

      console.log(this.LanguageList);

      this.saluationList = this.lookupDetails.salutation;
      this.addressTypeList = this.lookupDetails.addressType;
      this.maritalStatusList = this.lookupDetails.maritialStatus;
      this.raceIdList = this.lookupDetails.race;
      this.phoneTypeList = this.lookupDetails.phoneType;
      this.genderList = this.lookupDetails.gender;
    });
  }
  // Code for setting the values in contact form for autocomplete fields
  public setAutocompleteValue(event, field, flag: boolean): void {
    if (field === 'genderId') {
      if (flag) {
        console.log('Ramana');
        this.basicEditForm.get('genderId').setValue(event.id);
        if (event.name == 'MALE') {
          this.basicEditForm.get('saluation').setValue(flag ? 'MR' : '');
          this.basicEditForm.get('saluationId').setValue(flag ? 'MR' : '');
        } else if (event.name == 'FEMALE') {
          this.basicEditForm.get('saluation').setValue(flag ? 'MS' : '');
          this.basicEditForm.get('saluationId').setValue(flag ? 'MS' : '');
        }
      } else {
        this.basicEditForm.get('saluation').setValue('');
        this.basicEditForm.get('saluationId').setValue('');
        this.basicEditForm.get('genderId').setValue('');
      }
    }
    if (field === 'site') {
      this.basicEditForm.get('site').setValue(event.id);
      this.siteId = event.id;
      console.log(this.siteId);
    }
    if (field === 'raceId') {
      flag
        ? this.basicEditForm.get('raceId').setValue(event.id)
        : this.basicEditForm.get('raceId').setValue('');
    }
    if (field === 'maritalStatusList') {
      flag
        ? this.basicEditForm.get('maritalStatusList').setValue(event.id)
        : this.basicEditForm.get('maritalStatusList').setValue('');
    }
    if (field === 'saluationId') {
      flag
        ? this.basicEditForm.get('saluationId').setValue(event.id)
        : this.basicEditForm.get('saluationId').setValue('');
    }
    if (field === 'addressTypeList') {
      flag
        ? this.basicEditForm.get('addressTypeList').setValue(event.id)
        : this.basicEditForm.get('addressTypeList').setValue('');
      this.locationName = event.label;
    }
    if (field === 'phoneTypeList') {
      flag
        ? this.basicEditForm.get('phoneTypeList').setValue(event.id)
        : this.basicEditForm.get('phoneTypeList').setValue('');
    }
    if (field === 'phoneTypeList2') {
      flag
        ? this.basicEditForm.get('phoneTypeList2').setValue(event.id)
        : this.basicEditForm.get('phoneTypeList2').setValue('');
    }
    if (field === 'phoneTypeList3') {
      flag
        ? this.basicEditForm.get('phoneTypeList3').setValue(event.id)
        : this.basicEditForm.get('phoneTypeList3').setValue('');
    }
    // if (field === 'state') {
    // flag ? this.basicEditForm.get('phoneTypeList').setValue(event.id) : this.basicEditForm.get('phoneTypeList').setValue('');
    // }
    if (field === 'languageId') {
      flag
        ? this.basicEditForm.get('languageId').setValue(event.id)
        : this.basicEditForm.get('languageId').setValue('');
        // flag
        // ? this.basicEditForm.get('primelang').setValue(event.name)
        // : this.basicEditForm.get('primelang').setValue('');
      console.log(event)
    }
  }
  zipFlag: boolean;
  // Get zipcode data
  public getzip(): void {
    this.zipFlag= true;

    const zip = this.basicEditForm.get('zipcode').value != null ? this.basicEditForm.get('zipcode').value : 0;
    // this.basicEditForm.get('zipcode').setValue(this.basicEditForm.get('zipcode').value.toString().slice(0,5))
    console.log(zip)
    if (zip.toString().length == 5) {
      this.service.getZipcodeDetails(zip).subscribe((data) => {
        let responseFlag = Object.keys(data).length !== 0 ? true : false;
        responseFlag
          ? (this.zipDetails = data)
          : swal.fire({
            title: 'Invalid Zip Code',
            text: 'Please enter a valid Zip code.',
            icon: 'warning',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
          });
        console.log(data);
        this.stateId = responseFlag ? data.stateId : null;
        this.countyId = responseFlag ? data.countyId : null;
        this.timeZoneId = responseFlag ? data.timeZoneId : null;
        this.countryId = responseFlag ? data.countryId : null;
        this.basicEditForm
          .get('city')
          .setValue(responseFlag ? this.zipDetails.city : '');
        this.basicEditForm
          .get('country')
          .setValue(responseFlag ? this.zipDetails.country : '');
        this.basicEditForm
          .get('county')
          .setValue(responseFlag ? this.zipDetails.county : '');
        this.basicEditForm
          .get('timeZone')
          .setValue(responseFlag ? this.zipDetails.timeZone : '');
        this.basicEditForm
          .get('state')
          .setValue(responseFlag ? this.zipDetails.state : '');
      });
    }
  }
  // to update Functionality
  private previousBasicInfo(): void {
    this.previousPsDetails = JSON.parse(sessionStorage.getItem('psDetails'));
    // this.psId = this.previousPsDetails.psId;
    // let parameters = { 'psId': this.previousPsDetails.psId }
    this.psId=22854
    let parameters = { psId: this.psId };
    try {
      this.service.getPsDetails(JSON.stringify(parameters)).subscribe((res) => {
        this.basicPreviousDetails = res;
        console.log(this.basicPreviousDetails);
        this.basicEditForm
          .get('saluationId')
          .setValue(this.basicPreviousDetails.SALUTATIONId);
        this.basicEditForm
          .get('saluation')
          .setValue(this.basicPreviousDetails.SALUTATION);
        this.basicEditForm
          .get('firstName')
          .setValue(this.basicPreviousDetails.firstname);
        this.basicEditForm
          .get('lastName')
          .setValue(this.basicPreviousDetails.lastname);
        this.basicEditForm.get('dob').setValue(this.basicPreviousDetails.dob);
        this.basicEditForm
          .get('genderId')
          .setValue(this.basicPreviousDetails.genderId);
        this.basicEditForm
          .get('gender')
          .setValue(this.basicPreviousDetails.gender);
        this.basicEditForm
          .get('raceId')
          .setValue(this.basicPreviousDetails.raceId);
        this.basicEditForm.get('race').setValue(this.basicPreviousDetails.race);
        this.basicEditForm
          .get('primelang')
          .setValue(this.basicPreviousDetails.language);
        this.basicEditForm
          .get('languageId')
          .setValue(this.basicPreviousDetails.languageId);
        this.basicEditForm
          .get('maritalStatus')
          .setValue(this.basicPreviousDetails.MARITIALSTATUS);
        this.basicEditForm
          .get('maritalStatusList')
          .setValue(this.basicPreviousDetails.MARITIALSTATUSId);
        this.basicEditForm
          .get('city')
          .setValue(this.basicPreviousDetails.county);
        this.basicEditForm
          .get('country')
          .setValue(this.basicPreviousDetails.country);
        // this.basicEditForm.get('countyId').setValue(this.basicPreviousDetails.countyId);
        this.basicEditForm
          .get('county')
          .setValue(this.basicPreviousDetails.county);
        this.basicEditForm
          .get('timeZone')
          .setValue(this.basicPreviousDetails.timezone);
        // this.basicEditForm.get('timeZoneId').setValue(this.basicPreviousDetails.TIMEZONEID);
        this.basicEditForm
          .get('state')
          .setValue(this.basicPreviousDetails.state);
        // this.basicEditForm.get('stateId').setValue(this.basicPreviousDetails.stateId);
        this.basicEditForm
          .get('addressTypeList')
          .setValue(this.basicPreviousDetails.locationId);
        this.basicEditForm
          .get('phonetype')
          .setValue(this.basicPreviousDetails.PHONETYPE);
        this.basicEditForm
          .get('phoneTypeList')
          .setValue(this.basicPreviousDetails.PHONETYPE);
        this.basicEditForm
          .get('addressLine1')
          .setValue(this.basicPreviousDetails.street);
        this.basicEditForm
          .get('addressLine2')
          .setValue(this.basicPreviousDetails.addressLine2);
        // this.basicEditForm.get('phonetype3').setValue(this.basicPreviousDetails.PHONETYPE);
        // this.basicEditForm.get('phoneTypeList3').setValue(this.basicPreviousDetails.PHONETYPE);
        this.PhoneNumFormat(null, 'phone', this.basicPreviousDetails.PHONE);
        this.PhoneNumFormat(null, 'ssn', this.basicPreviousDetails.ssn);
        this.basicEditForm
          .get('zipcode')
          .setValue(this.basicPreviousDetails.ZIPCODE);
        this.basicEditForm
          .get('location')
          .setValue(this.basicPreviousDetails.locationName);
        //sitelist
        let siteList = JSON.parse("[" + this.basicPreviousDetails.mappedOfficeIds + "]");
        this.siteSelectedItems = this.mappedArray.filter(item => siteList.includes(item.siteId))
        this.siteId = this.basicPreviousDetails.officeId;

      });
    } catch (error) {
      console.log(error);
    }
  }

  public psIdSelect(i): void {
    this.basicEditForm.get('site').setValue(this.siteSelectedItems[i].id);
    this.siteId = this.siteSelectedItems[i].siteId;
    console.log(this.siteSelectedItems[i])
    this.basicEditForm
      .get('siteName')
      .setValue(this.siteSelectedItems[i].siteName);
    this.basicEditForm
      .get('officeId')
      .setValue(this.siteSelectedItems[i].siteId);
  }
  public siteListDeSelect(): void {
    this.siteSelectedItems.length = 0;
    this.basicEditForm.get('site').setValue('');
    this.siteId = null;
    this.basicEditForm.get('siteName').setValue('');
  }


  // Code for validating the input for the phone number
  private phoneValidation() {
    let phone1Flag: boolean;
    let phone2Flag: boolean;
    let phone3Flag: boolean;
    if (
      (this.basicEditForm.value.number != undefined || null) &&
      this.basicEditForm.value.number.length > 0
    ) {
      console.log('phone1', this.basicEditForm.value.number.length);
      if (this.basicEditForm.value.number.length == 12) {
        var phone1areacode = this.basicEditForm.value.number.slice(0, 3);
        var phone1exchangecode = this.basicEditForm.value.number.slice(4, 7);
        if (
          phone1areacode >= 1 &&
          phone1areacode >= 199 &&
          phone1exchangecode >= 1 &&
          phone1exchangecode >= 199
        ) {
          phone1Flag = false;
        } else {
          // phone1Flag = true;
          if (phone1areacode <= 1 || phone1areacode <= 199) {
            console.log('area code missing');
            this.alertbox(
              'Area Code (first 3 digits) should not be in between 001 and 199 for Phone '
            );
          }
          if (phone1exchangecode <= 1 || phone1exchangecode <= 199) {
            console.log('area exchange code missing');

            this.alertbox(
              'Exchange (middle 3 digits) should not be in between 001 and 199 for Phone '
            );
          }
        }
        console.log('phone1 flag is', phone1Flag);
      } else {
        phone1Flag = true;
        this.alertbox('Phone1 should be 10 digits');
      }
    }
    if (
      (this.basicEditForm.value.number2 != undefined || null) &&
      this.basicEditForm.value.number2.length > 0
    ) {
      console.log('phone2', this.basicEditForm.value.number2.length);
      if (this.basicEditForm.value.number2.length == 12) {
        var phone2areacode = this.basicEditForm.value.number2.slice(0, 3);
        var phone2exchangecode = this.basicEditForm.value.number2.slice(4, 7);
        if (
          phone2areacode >= 1 &&
          phone2areacode >= 199 &&
          phone2exchangecode >= 1 &&
          phone2exchangecode >= 199
        ) {
          phone2Flag = false;
        } else {
          phone2Flag = true;
          if (phone2areacode <= 1 || phone2areacode <= 199) {
            this.alertbox(
              'Area Code (first 3 digits) should not be in between 001 and 199 for Phone 2'
            );
          }
          if (phone2exchangecode <= 1 || phone2exchangecode <= 199) {
            this.alertbox(
              'Exchange (middle 3 digits) should not be in between 001 and 199 for Phone 2'
            );
          }
        }
        console.log('phone2 flag is', phone2Flag);
      } else {
        phone2Flag = true;
        this.alertbox('Phone 2 should be 10 digits');
      }
    }
    if (
      (this.basicEditForm.value.number3 != undefined || null) &&
      this.basicEditForm.value.number3.length > 0
    ) {
      console.log('phone3', this.basicEditForm.value.number3.length);
      if (this.basicEditForm.value.number3.length == 12) {
        var phone3areacode = this.basicEditForm.value.number3.slice(0, 3);
        var phone3exchangecode = this.basicEditForm.value.number3.slice(4, 7);
        if (
          phone3areacode >= 1 &&
          phone3areacode >= 199 &&
          phone3exchangecode >= 1 &&
          phone3exchangecode >= 199
        ) {
          phone3Flag = false;
        } else {
          phone3Flag = true;
          if (phone3areacode <= 1 || phone3areacode <= 199) {
            this.alertbox(
              'Area Code (first 3 digits) should not be in between 001 and 199 for Phone 3 '
            );
          }
          if (phone3exchangecode <= 1 || phone3exchangecode <= 199) {
            this.alertbox(
              'Exchange (middle 3 digits) should not be in between 001 and 199 for Phone 3'
            );
          }
        }
        console.log('phone1 flag is', phone3Flag);
      } else {
        phone3Flag = true;
        this.alertbox('Phone3 should be 10 digits');
      }
    }
    if (!phone3Flag && !phone2Flag && !phone1Flag) {
      let ssnLength = this.basicEditForm.value.ssn.length;
      ssnLength == 0 ? this.saveBasic() : this.checkSSn();

      console.log('all are valid phone nums');
    }
  }
  // Code of alert for invalid phone number input
  private alertbox(string) {
    var message = 'Invalid Number';
    swal.fire(message, string, 'warning');
  }
  // Code for validating the ssn
  private checkSSn() {
    if (this.basicEditForm.value.ssn.replace(/-/g, '') == 999999999) {
      console.log('ssn ERRor');
      swal.fire({
        title: 'Invalid SSN',
        text: "SSN should not contain all 9's",
        icon: 'warning',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
      });
    } else {
      try {
        let params = { ssn: this.basicEditForm.value.ssn, screenFlag: 'ps' };
        this.service
          .validateSSNNumber(JSON.stringify(params))
          .subscribe((data) => {
            console.log(data);
            if (Object.keys(data).length !== 0) {
              let data2: any = data;

              swal.fire({
                title: 'Invalid SSN',
                text: data2.ErrorMsg,
                icon: 'error',
                confirmButtonText: 'OK',
                allowOutsideClick: false,
              });
            } else {
              this.saveBasic();
            }
          });
      } catch (error) { }
    }
  }
  // Setting a format for phone numbers
  public PhoneNumFormat(event, flag, value?) {
    let input = event != null ? event.target.value : value;
    if (flag == 'phone') {
      this.basicEditForm.get('number').setValue(this.service.PhoneNumFormat(input, 12));
    } else if (flag == 'ssn') {
      this.basicEditForm.get('ssn').setValue(this.service.PhoneNumFormat(input, 11));
    } else if (flag == 'phone2') {
      this.basicEditForm.get('number2').setValue(this.service.PhoneNumFormat(input, 12));
    } else if (flag == 'phone3') {
      this.basicEditForm.get('number3').setValue(this.service.PhoneNumFormat(input, 12));
    }


  }

}
