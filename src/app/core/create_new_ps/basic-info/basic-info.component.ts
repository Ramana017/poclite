import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { PSRegistrationService } from '../../../services/PS-registarion.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import swal from 'sweetalert2';


@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {
  @Input() popup: boolean;
  modelref: BsModalRef;
  public psId: number = 0;
  public officeList: any;
  public basicForm: FormGroup;
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
    text: "Site Name",
    enableSearchFilter: true,
    labelKey: 'siteName',
    primaryKey: 'id',
    class: 'checkbox-list',
    showCheckbox: true

  };
  public currentDate: Date = new Date()
  public formError: boolean = false;
  private userId: number;
  public mappedArray: Array<any>;
  constructor(private fb: FormBuilder, public modalService: BsModalService, public service: PSRegistrationService, public date: DatePipe, private router: Router, private http: HttpClient) {
    console.log("basic constructer", this.popup);
    this.userId = this.service.getUserId()
    this.newForm();


  }
  ngOnInit() {

    console.log("basic", this.userMappedOffices.length === 0);
    this.getUserOfficeList();
    this.basicDetails();
  }

  private newForm(): void {
    this.basicForm = this.fb.group({
      location: ['', Validators.required],
      phonetype: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      race: ['', Validators.required],
      gender: ['', Validators.required],
      saluation: ['', Validators.required],
      saluationId: ['', Validators.required],
      site: [''],
      language: ['', Validators.required],
      languageId: ['', Validators.required],
      genderId: ['', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      raceId: ['', Validators.required],
      ssn: [''],
      addressLine2: [''],
      number: ['', [Validators.required]],
      maritalStatusList: ['', Validators.required],
      addressTypeList: ['', Validators.required],
      phoneTypeList: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
      country: ['', Validators.required],
      county: ['', Validators.required],
      state: ['', Validators.required],
      timeZone: ['', Validators.required],
      lane: ['', Validators.required],
      dob: ['', Validators.required],
      siteName: ['']
    });
  }
  get f() {
    return this.basicForm.controls;

  }
  dob1;
  public onSubmit(): void {
    console.log(this.basicForm.value)
    this.basicForm.get('dob').value > this.currentDate ? this.basicForm.get('dob').setValue(this.currentDate) : '';
    this.mappedArray = [];
    this.formError = true;
    this.mappedArray = this.siteSelectedItems.length > 0 ? (this.siteSelectedItems.map(a => a.id)) : [0];
    let siteFlag = this.mappedArray.includes(this.siteId);
    let ssnLength = this.basicForm.value.ssn.length;
    if (this.basicForm.valid && siteFlag) {
      if (this.basicForm.value.number.length == 12) {
        var phone1areacode = this.basicForm.value.number.slice(0, 3);
        var phone1exchangecode = this.basicForm.value.number.slice(4, 7)
        if (phone1areacode >= 199 && phone1exchangecode >= 199) {
          console.log("phone number is correct");
          ssnLength == 0 ? this.saveBasic() : this.checkSSn();

        }
        else {
          // phone1Flag = true;
          if (phone1areacode <= 1 || phone1areacode <= 199) {
            console.log("area code missing")
            this.alertbox("Area Code (first 3 digits) should not be in between 001 and 199 for Phone ")
          }
          if (phone1exchangecode <= 1 || phone1exchangecode <= 199) {
            console.log("area exchange code missing")

            this.alertbox("Exchange (middle 3 digits)  should not be in between 001 and 199 for Phone ")
          }
        }
        console.log("phone1 flag is")


      }
      else {
        this.alertbox(" Phone number should be 10 digits ")

      }


    }
    else if (this.basicForm.invalid || this.siteSelectedItems.length == 0) {
      // alert('Fill the required fields');
      swal.fire({
        title: 'Invalid Form',
        text: 'Fill all the Required fields',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false
      })
      console.log(this.basicForm.value)

    }
    else if (!siteFlag) {
      swal.fire({
        title: 'Invalid Mapped Sites',
        text: 'Please select the Home Site',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false
      })
    }
  }
  public getUserOfficeList(): void {
    let jsonObj = { 'userId': this.userId };

    this.service.getLookupDetails(JSON.stringify(jsonObj)).subscribe(data => {
      this.officeList = data;
      console.log(this.officeList);
      this.userMappedOffices = this.officeList.userMappedOffices;

    });
  }
  private saveBasic() {

    const jsonObj = {
      "psId": this.psId,
      "saluationId": (this.basicForm.value.saluationId),
      "genderId": (this.basicForm.value.genderId),
      "lastName": (this.basicForm.value.lastName),
      "firstName": (this.basicForm.value.firstName),
      "raceId": (this.basicForm.value.raceId),
      "maritalStatusID": (this.basicForm.value.maritalStatusList),
      "dob": this.date.transform(this.basicForm.value.dob, 'MM/dd/yyyy'),
      "ssn": this.basicForm.value.ssn.replace(/-/g, ''),
      "languageId": +(this.basicForm.value.languageId),
      "locationId": (this.basicForm.value.addressTypeList),
      "city": (this.basicForm.value.city),
      "addressLine": (this.basicForm.value.lane),
      "addressLine2": this.basicForm.value.addressLine2,
      "zipcode": (this.basicForm.value.zipcode),
      "phoneTypeid": (this.basicForm.value.phoneTypeList),
      "phone": (this.basicForm.value.number.replace(/-/g, '')),
      "stateId": this.stateId,
      "countyId": this.countyId,
      "timeZoneId": this.timeZoneId,
      "countryId": this.countryId,
      "officeId": (this.siteId),
      "mappedOfficeIds": this.mappedArray.toString(),
      "updatedUserId": this.userId,
    }
    console.log(JSON.stringify(jsonObj));
    let parameters = JSON.stringify(jsonObj)
    try {
      this.service.savePs(parameters).subscribe(res => {
        this.SaveResponse = res;
        console.log(res, 'getting the psId details');
        // alert(JSON.stringify(this.SaveResponse));
        if (Object.keys(this.SaveResponse).length !== 0) {
          if (this.popup) {
            this.modelref.hide();

          } else {
            console.log(JSON.stringify(jsonObj));
            sessionStorage.setItem('psDetails', JSON.stringify(this.SaveResponse));
            this.service.showSuccess('PS saved Succssfully!');
            this.router.navigateByUrl('registration/guarantor');
          }
        }
      });


    } catch (error) {

    }
  }
  public basicDetails() {
    this.service.getLookupsDataBasic().subscribe(data => {
      this.lookupDetails = data;
      console.log(this.lookupDetails)
      this.LanguageList = this.lookupDetails.language;
      this.saluationList = this.lookupDetails.salutation;
      this.addressTypeList = this.lookupDetails.addressType;
      this.maritalStatusList = this.lookupDetails.maritialStatus;
      this.raceIdList = this.lookupDetails.race;
      this.phoneTypeList = this.lookupDetails.phoneType;
      this.genderList = this.lookupDetails.gender;
    })

  }

  public selectChange(event, field, flag: boolean): void {

    if (field === 'genderId') {
      if (flag) {
        console.log("Ramana")
        this.basicForm.get('genderId').setValue(event.id);
        if (event.name == "MALE") {
          this.basicForm.get('saluation').setValue(flag ? "MR" : '');
          this.basicForm.get('saluationId').setValue(flag ? "MR" : '');
        } else if (event.name == "FEMALE") {
          this.basicForm.get('saluation').setValue(flag ? "MS" : '');
          this.basicForm.get('saluationId').setValue(flag ? "MS" : '');
        }
      } else {
        this.basicForm.get('saluation').setValue('');
        this.basicForm.get('saluationId').setValue('');
        this.basicForm.get('genderId').setValue('');
      }
    }
    if (field === 'site') {
      this.basicForm.get('site').setValue(event.id);
      this.siteId = event.id;
      console.log(this.siteId);
    }
    if (field === 'raceId') {
      flag ? this.basicForm.get('raceId').setValue(event.id) : this.basicForm.get('raceId').setValue('');;
    }
    if (field === 'maritalStatusList') {
      flag ? this.basicForm.get('maritalStatusList').setValue(event.id) : this.basicForm.get('maritalStatusList').setValue('');
    }
    if (field === 'saluationId') {
      flag ? this.basicForm.get('saluationId').setValue(event.id) : this.basicForm.get('saluationId').setValue('');
    }
    if (field === 'addressTypeList') {
      flag ? this.basicForm.get('addressTypeList').setValue(event.id) : this.basicForm.get('addressTypeList').setValue('');
      this.locationName = event.label;

    }
    if (field === 'phoneTypeList') {
      flag ? this.basicForm.get('phoneTypeList').setValue(event.id) : this.basicForm.get('phoneTypeList').setValue('');
    }
    if (field === 'state') {
      flag ? this.basicForm.get('phoneTypeList').setValue(event.id) : this.basicForm.get('phoneTypeList').setValue('');
    }
    if (field === 'languageId') {
      flag ? this.basicForm.get('languageId').setValue(event.id) : this.basicForm.get('languageId').setValue('');
    }

  }

  getzip(): void {
    const zip = this.basicForm.get('zipcode').value;
    // console.log(zip);
    if (zip.length === 5) {
      this.service.getZipcodeDetails(zip).subscribe(data => {
        if (Object.keys(data).length !== 0) {
          this.zipDetails = data;
          console.log(data)
          this.stateId = data.stateId
          this.countyId = data.countyId;
          this.timeZoneId = data.timeZoneId;
          this.countryId = data.countryId;
          this.basicForm.get('city').setValue(this.zipDetails.city);
          this.basicForm.get('country').setValue(this.zipDetails.country);
          this.basicForm.get('county').setValue(this.zipDetails.county);
          this.basicForm.get('timeZone').setValue(this.zipDetails.timeZone);
          this.basicForm.get('state').setValue(this.zipDetails.state);
        }

        else {
          swal.fire({
            title: 'Invalid Zip Code',
            text: 'Please enter a valid Zip code.',
            icon: 'warning',
            confirmButtonText: 'OK',
            allowOutsideClick: false
          })
          this.basicForm.get('city').setValue('');
          this.basicForm.get('country').setValue('');
          this.basicForm.get('county').setValue('');
          this.basicForm.get('timeZone').setValue('');
          this.basicForm.get('state').setValue('');
          this.basicForm.get('zipcode').setValue('');
          this.stateId = ''
          this.countyId = ''
          this.timeZoneId = ''
          this.countryId = ''
        }

      });
    }
  }
  // to update Functionality
  private previousBasicInfo(): void {
    this.previousPsDetails = JSON.parse(sessionStorage.getItem('psDetails'));
    this.psId = this.previousPsDetails.psId;
    let parameters = { 'psId': this.previousPsDetails.psId }
    try {
      this.service.getPsDetails(JSON.stringify(parameters)).subscribe(res => {
        this.basicPreviousDetails = res;
        console.log(this.basicPreviousDetails);
        this.basicForm.get('saluationId').setValue(this.basicPreviousDetails.SALUTATIONId);
        this.basicForm.get('saluation').setValue(this.basicPreviousDetails.SALUTATION);
        this.basicForm.get('firstName').setValue(this.basicPreviousDetails.firstname);
        this.basicForm.get('lastName').setValue(this.basicPreviousDetails.lastname);
        this.basicForm.get('dob').setValue(this.basicPreviousDetails.dob);
        this.basicForm.get('genderId').setValue(this.basicPreviousDetails.genderId);
        this.basicForm.get('gender').setValue(this.basicPreviousDetails.gender);
        this.basicForm.get('raceId').setValue(this.basicPreviousDetails.raceId);
        //   this.basicForm.get('race').setValue(this.basicPreviousDetails.race);
        this.basicForm.get('language').setValue(this.basicPreviousDetails.language);
        this.basicForm.get('languageId').setValue(this.basicPreviousDetails.languageId);
        this.basicForm.get('maritalStatus').setValue(this.basicPreviousDetails.MARITIALSTATUS);
        this.basicForm.get('maritalStatusList').setValue(this.basicPreviousDetails.MARITIALSTATUSId);
        this.basicForm.get('city').setValue(this.basicPreviousDetails.county);
        this.basicForm.get('country').setValue(this.basicPreviousDetails.country);
        this.basicForm.get('countyId').setValue(this.countyId);
        this.basicForm.get('county').setValue(this.basicPreviousDetails.county);
        this.basicForm.get('timeZone').setValue(this.basicPreviousDetails.timezone);
        this.basicForm.get('timeZoneId').setValue(this.timeZoneId);
        this.basicForm.get('state').setValue(this.basicPreviousDetails.state);
        this.basicForm.get('stateId').setValue(this.stateId);
        this.basicForm.get('addressTypeList').setValue(this.basicPreviousDetails.locationId);
        this.basicForm.get('phonetype').setValue(this.basicPreviousDetails.PHONETYPE);
        this.basicForm.get('phoneTypeList').setValue(this.basicPreviousDetails.PHONETYPE);
        this.basicForm.get('number').setValue(this.basicPreviousDetails.PHONE);
        this.basicForm.get('zipcode').setValue(this.basicPreviousDetails.ZIPCODE);
        this.basicForm.get('location').setValue(this.basicPreviousDetails.locationName);

      });
    } catch (error) {
      console.log(error);
    }
  }

  public psIdSelect(i): void {
    this.basicForm.get('site').setValue(this.siteSelectedItems[i].id);
    this.siteId = this.siteSelectedItems[i].id;
    this.basicForm.get('siteName').setValue(this.siteSelectedItems[i].siteName);
  }
  public siteListDeSelect(): void {
    this.siteSelectedItems.length = 0;
    this.basicForm.get('site').setValue('');
    this.siteId = null;
    this.basicForm.get('siteName').setValue('');
  }

  public PhoneNumFormat(event, flag) {

    var input = event.target.value;
    if (input != undefined) {
      let trimmed = input.replace(/\D/g, '');
      if (trimmed.length > 12) {
        trimmed = trimmed.substr(0, 12);
      }
      trimmed = trimmed.replace(/-/g, '');
      let numbers = [];
      numbers.push(trimmed.substr(0, 3));
      if (trimmed.substr(3, 2) !== "")
        numbers.push(trimmed.substr(3, 3));
      if (trimmed.substr(5, 4) != "" && trimmed.length >= 7)
        numbers.push(trimmed.substr(6, 4));

      if (flag == 'phone') {
        this.basicForm.get('number').setValue( numbers.join('-'));
      }else if(flag=="ssn"){
        this.basicForm.get('ssn').setValue( numbers.join('-'));
      }
      console.log("trimmed",trimmed)

    }
  }
  private alertbox(string) {
    var message = 'Invalid Number'
    swal.fire(message, string, 'warning')
  }
  private checkSSn() {
    if (this.basicForm.value.ssn.replace(/-/g, '') == 999999999) {

      console.log("ssn ERRor")
      swal.fire({
        title: 'Invalid SSN',
        text: "SSN should not contain all 9's",
        icon: 'warning',
        confirmButtonText: 'OK',
        allowOutsideClick: false
      })

    } else {
      try {
        let params = { 'ssn': this.basicForm.value.ssn.replace(/-/g, ''), "screenFlag": "ps" }
        this.service.validateSSNNumber(JSON.stringify(params)).subscribe(data => {
          console.log(data)
          if (Object.keys(data).length !== 0) {

            let data2: any = data;

            swal.fire({
              title: 'Invalid SSN',
              text: data2.ErrorMsg,
              icon: 'error',
              confirmButtonText: 'OK',
              allowOutsideClick: false
            })
          }
          else {
            this.saveBasic()
          }
        })
      } catch (error) {

      }
    }
  }

}

