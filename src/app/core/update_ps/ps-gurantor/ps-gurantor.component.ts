import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ZipcodeService } from '../../../services/zipcode.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-ps-gurantor',
  templateUrl: './ps-gurantor.component.html',
  styleUrls: ['./ps-gurantor.component.sass']
})
export class PsGurantorComponent implements OnInit {
  // Variables used in guarantor edit form
  public selfChecBox: boolean = false;
  public addressCheckBox: boolean = false;
  public guarantorId: number = 0;
  public basicPreviousData: any;
  public guarantorForm: FormGroup;
  public zipDetails: any;
  public occupationList = [];
  public relationshipList = [];
  // public relationId;
  public addressTypeList: any;
  public phoneTypeList: any;
  public Keyword = 'name';
  // public relationName;
  public salutationList: any;
  public lookupDetails: any;
  public formError: boolean = false;
  public previousPsDetails: any;
  public guarantorResponse: Object;
  public checkBoxAddress: boolean = false;
  public userId: number;
  private countryId: number;
  private stateId: number;
  private countyId: number;
  private timeZoneId: number;
  public phoneNUmber;


  constructor(private fb: FormBuilder, public service: ZipcodeService, private router: Router) {
    let data: any = this.userId = JSON.parse(sessionStorage.getItem("useraccount"));
    this.userId = data.userId
    // let session = sessionStorage.getItem('guarantorDetails');
    // if (session) {
    //   console.log('guranter present')
    //   this.getGuarantorDetails();
    // }

  }
  ngOnInit() {
    this.getGuarantorDetails();
    console.log("guarantor")
    this.newForm();
    this.getEditGuarantorLookups();
    this.getPsDetails();
  }
  // Code for FormGroup and FormControlNames
  private newForm(): void {
    this.guarantorForm = this.fb.group({
      salutation : [''],
      salutationId: [''],
      relationshipList: ['', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [],
      ssn: [''],
      number: ['', Validators.required],
      number2: [''],
      number3: [''],
      occupationList: ["UNKNOWN", Validators.required],
      addressTypeList: ['', Validators.required],
      phoneTypeList: ['', Validators.required],
      phoneTypeList2: ['', Validators.required],
      phoneTypeList3: ['', Validators.required],
      // phonetype: ['', Validators.required],
      // phonetype2: ['', Validators.required],
      // phonetype3: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
      zipFourCode: [''],
      country: ['', Validators.required],
      county: ['', Validators.required],
      state: ['', Validators.required],
      timeZone: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      location: ['', Validators.required],
      occupationName: ['UNKNOWN', Validators.required],
      relationId: ['', Validators.required],
      email: [''],
      fax: [''],
      code: [''],
      sortOrder: [''],
      directions: ['']
    });

  }

  get f() {

    return this.guarantorForm.controls;

  }
  // Code for submitting the edited guarantor form
  public onSubmit(): void {
    console.log(this.guarantorForm.value);

    this.formError = true;

    if (this.guarantorForm.valid) {
      this.phoneValidation();
    } else if (
      this.guarantorForm.invalid
    ) {
      swal.fire({
        title: 'Invalid Form',
        text: 'Fill all the Required fields',
        icon: 'error',
        confirmButtonText: 'Ok',
        allowOutsideClick: false,
      });
      console.log(this.guarantorForm.value);
    }
  }
  // Code for saving the edited guarantor form
  private saveEdittedGuarantor() {
    console.log(this.guarantorForm.value.ssn != undefined, this.guarantorForm)
    {
      const jsonObj = {
        "saluationId": (this.guarantorForm.value.salutationId),
        "lastName": this.guarantorForm.value.lastName,
        "firstName": this.guarantorForm.value.firstName,
        "relationShipId": (this.guarantorForm.value.relationshipList),
        "locationId": (this.guarantorForm.value.addressTypeList),
        "city": this.guarantorForm.value.city,
        "addressLine": this.guarantorForm.value.lane,
        "addressLine2": this.guarantorForm.value.lane2,
        "zipcode": this.guarantorForm.value.zipcode,
        "phoneTypeid": (this.guarantorForm.value.phoneTypeList),
        "phone": this.guarantorForm.value.number,
        "updatedUserId": this.userId,
        "psId": this.previousPsDetails.psId,
        "occupationId": this.guarantorForm.value.occupationList,
        "guarantorId": this.guarantorId,
        "stateId": this.stateId,
        "countyId": this.countyId,
        "timeZoneId": this.timeZoneId,
        "countryId": this.countryId,
        "ssn": this.guarantorForm.value.ssn != undefined ? this.guarantorForm.value.ssn.replace(/\D/g, '') : ''
      }
      let param = JSON.stringify(jsonObj);
      try {
        console.log(param)
        this.service.saveGuarantor(param).subscribe(res => {
          this.guarantorResponse = res;
          console.log(this.guarantorResponse)
          // if (Object.keys(this.guarantorResponse).length !== 0) {
          //   sessionStorage.setItem('guarantorDetails', JSON.stringify(this.guarantorResponse));
          //   this.service.showSuccess('PS Gurantor saved Succssfully!');
          //   this.router.navigateByUrl('registration-re/child-admission')
          // }
        });
      } catch (error) {
        console.log(error)
      }

    }
    console.log(this.guarantorForm.value)
  }
  // Get lookups for the guarantor form
  public getEditGuarantorLookups(): void {
    let jsonObj = { 'userId': this.userId };

    this.service.getEditGuarantorLookups().subscribe(data => {
      console.log(data)
      this.lookupDetails = data;
      this.salutationList = this.lookupDetails.salutation;
      this.addressTypeList = this.lookupDetails.addressType;
      this.phoneTypeList = this.lookupDetails.phoneType;
      this.relationshipList = this.lookupDetails.relationship;
      this.occupationList = this.lookupDetails.occupation;

    });
  }
  // Code for setting the values in contact form for autocomplete fields
  public setAutocompleteValue(event, field, flag): void {
    if (field === 'addressTypeList') {
      this.guarantorForm.get('addressTypeList').setValue(flag ? event.id : '');
    }

    if (field === 'relationshipList') {
      this.guarantorForm.get('relationshipList').setValue(flag ? event.id : '');
      if (flag) { // this.selfChecBox=true;
        event.id === '100' ? this.SelfCheck(null, true) : this.selfChecBox = false;;
      }

      // this.relationName = event.label;
      // this.relationId = event.id;
    }
    if (field === 'occupationList') {
      this.guarantorForm.get('occupationList').setValue(flag ? event.id : '');
    }
    if (field === 'salutationList') {
      this.guarantorForm.get('salutationList').setValue(flag ? event.id : '');
    }
    if (field === 'phoneTypeList') {
      console.log('inpuet cleared phoneid', flag)
      this.guarantorForm.get('phoneTypeList').setValue(flag ? event.id : '');
    }
    if (field === 'phoneTypeList2') {
      console.log('inpuet cleared phoneid', flag)
      this.guarantorForm.get('phoneTypeList2').setValue(flag ? event.id : '');
    }
    if (field === 'phoneTypeList3') {
      console.log('inpuet cleared phoneid', flag)
      this.guarantorForm.get('phoneTypeList3').setValue(flag ? event.id : '');
    }
  }

  // Get zipcode data
  public getzip(): void {
    const zip = this.guarantorForm.get('zipcode').value;
    console.log(zip);
    if (zip.toString().length === 5) {
      this.service.getZipcodeDetails(zip).subscribe(data => {
        if (Object.keys(data).length !== 0) {
          this.zipDetails = data;
          console.log(data)
          this.stateId = data.stateId
          this.countyId = data.countyId;
          this.timeZoneId = data.timeZoneId;
          this.countryId = data.countryId;
          console.log()
          this.guarantorForm.get('city').setValue(this.zipDetails.city);
          this.guarantorForm.get('country').setValue(this.zipDetails.country);
          this.guarantorForm.get('county').setValue(this.zipDetails.county);
          this.guarantorForm.get('timeZone').setValue(this.zipDetails.timeZone);
          this.guarantorForm.get('state').setValue(this.zipDetails.state);
        }

        else {
          swal.fire({
            title: 'Invalid pincode',
            text: 'Invalid ZIP code. Please enter a valid ZIP code.',
            icon: 'warning',
            confirmButtonText: 'Ok',
            allowOutsideClick: false
          })
          this.guarantorForm.get('zipcode').setValue('');
        }

      });
    }
  }
  // Get the details from the ps 
  private getPsDetails(): void {
    try {
      this.previousPsDetails = JSON.parse(sessionStorage.getItem('psDetails'));
      //   let parameters = { 'psId': this.previousPsDetails.psId }
      let parameters = { 'psId': 23448 }
      this.service.getPsDetails(JSON.stringify(parameters)).subscribe(res => {
        console.log(res)
        this.basicPreviousData = res;
      })
    } catch (error) {
      console.log(error)
    }
  }
  // Checked event to get the address details of the ps on checking the address box
  public addressCheck(event?, dropdown?: boolean): void {

    console.log(event)
    let flag = event != null ? event.target.checked : dropdown

    console.log("addressCheck")
    this.guarantorForm.get('addressTypeList').setValue(flag ? this.basicPreviousData.locationId : '');
    this.guarantorForm.get('location').setValue(flag ? this.basicPreviousData.locationName : '');
    this.guarantorForm.get('addressLine1').setValue(flag ? this.basicPreviousData.street : "");
    this.guarantorForm.get('addressLine2').setValue(flag ? this.basicPreviousData.addressLine2 : "");
    this.guarantorForm.get('zipcode').setValue(flag ? this.basicPreviousData.ZIPCODE : "");
    this.guarantorForm.get('phoneTypeList').setValue(flag ? this.basicPreviousData.PHONETYPEID : "")
    //  this.guarantorForm.get('phoneTypeName').setValue(flag ? this.basicPreviousData.PHONETYPE : "")
    this.guarantorForm.get('number').setValue(flag ? this.basicPreviousData.PHONE : "");
    this.guarantorForm.get('city').setValue(flag ? this.basicPreviousData.city : '');
    this.guarantorForm.get('state').setValue(flag ? this.basicPreviousData.state : '');
    this.guarantorForm.get('county').setValue(flag ? this.basicPreviousData.county : '');
    this.guarantorForm.get('timeZone').setValue(flag ? this.basicPreviousData.timezone : '');
    this.guarantorForm.get('country').setValue(flag ? this.basicPreviousData.country : '');
    this.stateId = this.basicPreviousData.stateId
    this.countyId = this.basicPreviousData.countyId;
    this.timeZoneId = this.basicPreviousData.TIMEZONEID;
    this.countryId = this.basicPreviousData.countryId;
  }
  // Checked event to get the details of both basic  and address details of the ps on checking the self box
  public SelfCheck(event?, dropdown?: boolean): void {
    let flag = event != null ? event.target.checked : dropdown;

    this.selfChecBox = event != null ? event.target.checked : '';

    console.log("selfcheck")
    this.guarantorForm.get('salutationId').setValue(flag?this.basicPreviousData.SALUTATIONId:'');
    this.guarantorForm.get('relationshipList').setValue(flag ? '100' : '');
    this.guarantorForm.get('relationId').setValue(flag ? 'SELF' : '');
    this.guarantorForm.get('lastName').setValue(flag ? this.basicPreviousData.lastname : '');
    this.guarantorForm.get('firstName').setValue(flag ? this.basicPreviousData.firstname : '');
    this.guarantorForm.get('ssn').setValue(flag ? this.basicPreviousData.ssn : '');
    flag ? this.checkBoxAddress = true : this.checkBoxAddress = false;
    // flag ? this.addressCheck(event) : this.addressCheck(event);
    this.addressCheck(event, dropdown);
  }
  // public getPreviousBasic(): void {
  //   this.router.navigateByUrl('registration-re/child-basic')
  // }

  // for update data
  private getGuarantorDetails() {
    let session: any = JSON.parse(sessionStorage.getItem('guarantorDetails'));
    // this.guarantorId = session.psGuarId;
    // let params = { 'guarantorId': session.psGuarId }
    this.guarantorId = 23489;
    let params = { 'guarantorId': 23489 }
    try {
      // console.log("$$$$$$$$$$$$$$",params,session)
      this.service.getGuarantorDetails(JSON.stringify(params)).subscribe(
        response => {
          let data: any = response;
          console.log(data)
          this.guarantorForm.get('relationshipList').setValue(data.relationshipId);
          this.guarantorForm.get('relationId').setValue(data.relationship);//data.relationshipName
          this.guarantorForm.get('occupationName').setValue('occuptaion');//data.occuptaionname
          this.guarantorForm.get('occupationList').setValue(data.occupationId);//data.occuptaionname
          this.guarantorForm.get('lastName').setValue(data.lastname);
          this.guarantorForm.get('firstName').setValue(data.firstname);
          this.guarantorForm.get('ssn').setValue(data.ssn);

          //address
          this.guarantorForm.get('addressTypeList').setValue(data.locationId);
          this.guarantorForm.get('location').setValue(data.locationName);
          this.guarantorForm.get('addressLine1').setValue(data.street);
          this.guarantorForm.get('addressLine2').setValue(data.addressLine2);
          this.guarantorForm.get('zipcode').setValue(data.ZIPCODE);
          this.guarantorForm.get('phoneTypeList').setValue(data.PHONETYPE)
          //  this.guarantorForm.get('phonetype').setValue(data.PHONETYPE)
          this.guarantorForm.get('number').setValue(data.PHONE);
          this.guarantorForm.get('city').setValue(data.county);
          this.guarantorForm.get('state').setValue(data.state);
          this.guarantorForm.get('county').setValue(data.county);
          this.guarantorForm.get('timeZone').setValue(data.timezone);
          this.guarantorForm.get('country').setValue(data.country);

        }
      )

    } catch (error) {
      console.log(error)
    }

  }
  // Code clear the relationship field
  public relationshipCleared(event) {
    console.log(event)
  }
  // Code for validating the input for the phone number
  private phoneValidation() {
    let phone1Flag: boolean;
    let phone2Flag: boolean;
    let phone3Flag: boolean;
    if (
      (this.guarantorForm.value.number != undefined || null) &&
      this.guarantorForm.value.number.length > 0
    ) {
      console.log('phone1', this.guarantorForm.value.number.length);
      if (this.guarantorForm.value.number.length == 12) {
        var phone1areacode = this.guarantorForm.value.number.slice(0, 3);
        var phone1exchangecode = this.guarantorForm.value.number.slice(4, 7);
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
              'Exchange (middle 3 digits)  should not be in between 001 and 199 for Phone '
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
      (this.guarantorForm.value.number2 != undefined || null) &&
      this.guarantorForm.value.number2.length > 0
    ) {
      console.log('phone2', this.guarantorForm.value.number2.length);
      if (this.guarantorForm.value.number2.length == 12) {
        var phone2areacode = this.guarantorForm.value.number2.slice(0, 3);
        var phone2exchangecode = this.guarantorForm.value.number2.slice(4, 7);
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
              'Exchange (middle 3 digits)  should not be in between 001 and 199 for Phone 2'
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
      (this.guarantorForm.value.number3 != undefined || null) &&
      this.guarantorForm.value.number3.length > 0
    ) {
      console.log('phone3', this.guarantorForm.value.number3.length);
      if (this.guarantorForm.value.number3.length == 12) {
        var phone3areacode = this.guarantorForm.value.number3.slice(0, 3);
        var phone3exchangecode = this.guarantorForm.value.number3.slice(4, 7);
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
              'Exchange (middle 3 digits)  should not be in between 001 and 199 for Phone 3'
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
      let ssnLength = this.guarantorForm.value.ssn.length;
      ssnLength == 0 ? this.saveEdittedGuarantor() : this.checkSSn();

      console.log('all are valid phone nums');
    }
  }
  // Code of alert for invalid phone number input
  private alertbox(string) {
    var message = 'Invalid Number'
    swal.fire(message, string, 'warning')
  }
  //  Code for validating the ssn
  private checkSSn() {
    try {
      let params = { 'ssn': this.guarantorForm.value.ssn, "screenFlag": "guarantor" }
      this.service.validateSSNNumber(JSON.stringify(params)).subscribe(data => {
        console.log(data)
        if (Object.keys(data).length !== 0) {

          let data2: any = data;

          swal.fire({
            title: 'Invalid SSN',
            text: data2.ErrorMsg,
            icon: 'error',
            confirmButtonText: 'Ok',
            allowOutsideClick: false
          })
        }
        else {
          this.saveEdittedGuarantor()
        }
      })
    } catch (error) {

    }
  }
  // Setting a format for phone numbers
  public PhoneNumFormat(event, flag, value?) {
    var input = event != null ? event.target.value : value;
    if (input != undefined) {
      let trimmed = input.replace(/\D/g, '');
      if (trimmed.length > 12) {
        trimmed = trimmed.substr(0, 12);
      }
      trimmed = trimmed.replace(/-/g, '');
      let numbers = [];
      numbers.push(trimmed.substr(0, 3));
      if (trimmed.substr(3, 2) !== '') numbers.push(trimmed.substr(3, 3));
      if (trimmed.substr(5, 4) != '' && trimmed.length >= 7)
        numbers.push(trimmed.substr(6, 4));

      if (flag == 'phone') {
        this.guarantorForm.get('number').setValue(numbers.join('-'));
      } else if (flag == 'ssn') {
        this.guarantorForm.get('ssn').setValue(numbers.join('-'));
      } else if (flag == 'phone2') {
        this.guarantorForm.get('number2').setValue(numbers.join('-'));
      } else if (flag == 'phone3') {
        this.guarantorForm.get('number3').setValue(numbers.join('-'));
      }
    }
  }

}
