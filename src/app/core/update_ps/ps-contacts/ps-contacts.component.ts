import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ZipcodeService } from 'src/app/services/zipcode.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ps-contacts',
  templateUrl: './ps-contacts.component.html',
  styleUrls: ['./ps-contacts.component.sass']
})
export class PsContactsComponent implements OnInit {

  @Input() popup: boolean;
  modelref: BsModalRef;
  public psId: number = 0;
  public officeList: any;
  public contactForm: FormGroup;
  public lookupDetails: any;
  public saluationList: any;
  public addressTypeList: any;
  public maritalStatusList: any;
  public relationshipList: any;
  public LanguageList: any;
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
  public phoneNUmber;
  public phoneNUmber2;
  public phoneNUmber3;
  public formError: boolean = false;
  private userId: number;
  public mappedArray: Array<any>;
  // tslint:disable-next-line: max-line-length
  constructor(
    private fb: FormBuilder,
    public modalService: BsModalService,
    public service: ZipcodeService,
    public date: DatePipe,
    private router: Router,
    private http: HttpClient
  ) {
    console.log('basic constructer', this.popup);
    let data: any = (this.userId = JSON.parse(
      sessionStorage.getItem('useraccount')
    ));
    this.userId = data.userId;
    this.newForm();
    // let userExist = sessionStorage.getItem('psDetails');
    // if (userExist) {
    //   this.previousBasicInfo();
    // }+6
  }
  ngOnInit() {
    //this.previousBasicInfo();
    console.log('basic', this.userMappedOffices.length === 0);
    //  this.getUserOfficeList();
    this.basicDetails();
  }

  private newForm(): void {
    this.contactForm = this.fb.group({
      contactType: ['',Validators.required],
      location: ['', Validators.required],
      phonetype: ['', Validators.required],
      phonetype2: ['', Validators.required],
      phonetype3: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      gender: ['', Validators.required],
      saluation: ['', Validators.required],
      saluationId: ['', Validators.required],
      middleName: [''],
      alias: [''],
      genderId: ['', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      primaryPhNumber: ['', Validators.required],
      ssn: [''],
      addressLine1: ['',Validators.required],
      addressLine2: [''],
      number: ['', [Validators.required]],
      number2: [''],
      number3: [''],
      relationshipList: ['', Validators.required],
      addressTypeList: ['', Validators.required],
      phoneTypeList: ['', Validators.required],
      phoneTypeList2: ['', Validators.required],
      phoneTypeList3: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
      zipFourCode: [''],
      country: ['', Validators.required],
      county: ['', Validators.required],
      state: ['', Validators.required],
      timeZone: ['', Validators.required],
      notes: [ ''],
      dob: ['', Validators.required],
      fax: [''],
      email: [''],
      directions: [''],
    });
  }
  get f() {
    return this.contactForm.controls;
  }
  public onSubmit(): void {
    console.log(this.contactForm.value);
    this.contactForm.get('dob').value > this.currentDate
      ? this.contactForm.get('dob').setValue(this.currentDate)
      : '';
    this.mappedArray = [];
    this.formError = true;
    this.phoneNUmber = this.contactForm.value.number;
    this.phoneNUmber2 = this.contactForm.value.number2;
    this.phoneNUmber3 = this.contactForm.value.number3;
    this.mappedArray =
      this.siteSelectedItems.length > 0
        ? this.siteSelectedItems.map((a) => a.id)
        : [0];
    let siteFlag = this.mappedArray.includes(this.siteId);
    if (this.contactForm.valid && siteFlag) {
      this.phoneValidation();
    } else if (
      this.contactForm.invalid ||
      this.siteSelectedItems.length == 0
    ) {
      swal.fire({
        title: 'Invalid Form',
        text: 'Fill all the Required fields',
        icon: 'error',
        confirmButtonText: 'Ok',
        allowOutsideClick: false,
      });
      console.log(this.contactForm.value);
    } else if (!siteFlag) {
      swal.fire({
        title: 'Invalid Mapped Sites',
        text: 'Please select the Home Site',
        icon: 'error',
        confirmButtonText: 'Ok',
        allowOutsideClick: false,
      });
    }
  }
  // public getUserOfficeList(): void {
  //   let jsonObj = { 'userId': this.userId };

  //   this.service.getLookupDetails(JSON.stringify(jsonObj)).subscribe(data => {
  //     this.officeList = data;
  //     console.log(this.officeList);
  //     this.userMappedOffices = this.officeList.userMappedOffices;

  //   });
  // }
  private saveBasic() {
    const jsonObj = {
      psId: this.psId,
      saluationId: this.contactForm.value.saluationId,
      genderId: this.contactForm.value.genderId,
      lastName: this.contactForm.value.lastName,
      firstName: this.contactForm.value.firstName,
      relationShipId: this.contactForm.value.relationshipList,
      maritalStatusID: this.contactForm.value.maritalStatusList,
      dob: this.date.transform(this.contactForm.value.dob, 'MM/dd/yyyy'),
      ssn: this.contactForm.value.ssn.replace(/-/g, ''),
      locationId: this.contactForm.value.addressTypeList,
      city: this.contactForm.value.city,
      addressLine: this.contactForm.value.addressLine1,
      addressLine2: this.contactForm.value.addressLine2,
      zipcode: this.contactForm.value.zipcode,
      phoneTypeid: this.contactForm.value.phoneTypeList,
      phone: this.contactForm.value.number.replace(/-/g, ''),
      stateId: this.stateId,
      countyId: this.countyId,
      timeZoneId: this.timeZoneId,
      countryId: this.countryId,
      officeId: this.siteId,
      mappedOfficeIds: this.mappedArray.toString(),
      updatedUserId: this.userId,
      middleName:this.contactForm.value.middleName,
      aliasName: this.contactForm.value.aliasName,
      zip4Code: this.contactForm.value.zip4Code,
      phoneTypeid2: this.contactForm.value.phoneTypeid2,
      phone2: this.contactForm.value.number2.replace(/-/g, ''),
      phoneTypeid3: this.contactForm.value.phoneTypeid3,
      phone3: this.contactForm.value.number3.replace(/-/g, ''),
      fax: this.contactForm.value.fax,
      email:this.contactForm.value.email,
      directions: this.contactForm.value.directions,
    };
    console.log(JSON.stringify(jsonObj));
    let parameters = JSON.stringify(jsonObj);
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
            sessionStorage.setItem(
              'psDetails',
              JSON.stringify(this.SaveResponse)
            );
            this.service.showSuccess('PS saved Succssfully!');
            this.router.navigateByUrl('registration-re/child-guarantor');
          }
        }
      });
    } catch (error) {}
  }
  public basicDetails() {
    this.service.getContactsData().subscribe((data) => {
      this.lookupDetails = data;
      console.log(this.lookupDetails);
      this.LanguageList = this.lookupDetails.language;
      this.relationshipList = this.lookupDetails.relationship;
      this.saluationList = this.lookupDetails.salutation;
      this.addressTypeList = this.lookupDetails.addressType;
      this.maritalStatusList = this.lookupDetails.maritialStatus;
      this.phoneTypeList = this.lookupDetails.phoneType;
      this.genderList = this.lookupDetails.gender;
    });
  }

  public selectChange(event, field, flag: boolean): void {
    if (field === 'genderId') {
      if (flag) {
        console.log('Ramana');
        this.contactForm.get('genderId').setValue(event.id);
        if (event.name == 'MALE') {
          this.contactForm.get('saluation').setValue(flag ? 'MR' : '');
          this.contactForm.get('saluationId').setValue(flag ? 'MR' : '');
        } else if (event.name == 'FEMALE') {
          this.contactForm.get('saluation').setValue(flag ? 'MS' : '');
          this.contactForm.get('saluationId').setValue(flag ? 'MS' : '');
        }
      } else {
        this.contactForm.get('saluation').setValue('');
        this.contactForm.get('saluationId').setValue('');
        this.contactForm.get('genderId').setValue('');
      }
    }
   
    if (field === 'relationshipList') {
      this.contactForm.get('relationshipList').setValue(flag ? event.id : '');
     

      // this.relationName = event.label;
      // this.relationId = event.id;
    }

    if (field === 'saluationId') {
      flag
        ? this.contactForm.get('saluationId').setValue(event.id)
        : this.contactForm.get('saluationId').setValue('');
    }
    if (field === 'addressTypeList') {
      flag
        ? this.contactForm.get('addressTypeList').setValue(event.id)
        : this.contactForm.get('addressTypeList').setValue('');
      this.locationName = event.label;
    }
    if (field === 'phoneTypeList') {
      flag
        ? this.contactForm.get('phoneTypeList').setValue(event.id)
        : this.contactForm.get('phoneTypeList').setValue('');
    }
    if (field === 'phoneTypeList2') {
      flag
        ? this.contactForm.get('phoneTypeList2').setValue(event.id)
        : this.contactForm.get('phoneTypeList2').setValue('');
    }
    if (field === 'phoneTypeList3') {
      flag
        ? this.contactForm.get('phoneTypeList3').setValue(event.id)
        : this.contactForm.get('phoneTypeList3').setValue('');
    }
    // if (field === 'state') {
    //   flag ? this.basicEditForm.get('phoneTypeList').setValue(event.id) : this.basicEditForm.get('phoneTypeList').setValue('');
    // }
    if (field === 'languageId') {
      flag
        ? this.contactForm.get('languageId').setValue(event.id)
        : this.contactForm.get('languageId').setValue('');
    }
  }

  public getzip(): void {
    const zip = this.contactForm.get('zipcode').value;
    if (zip.length === 5) {
      this.service.getZipcodeDetails(zip).subscribe((data) => {
        let responseFlag = Object.keys(data).length !== 0 ? true : false;
        responseFlag
          ? (this.zipDetails = data)
          : swal.fire({
              title: 'Invalid Zip Code',
              text: 'Please enter a valid Zip code.',
              icon: 'warning',
              confirmButtonText: 'Ok',
              allowOutsideClick: false,
            });
        console.log(data);
        this.stateId = responseFlag ? data.stateId : null;
        this.countyId = responseFlag ? data.countyId : null;
        this.timeZoneId = responseFlag ? data.timeZoneId : null;
        this.countryId = responseFlag ? data.countryId : null;
        this.contactForm
          .get('city')
          .setValue(responseFlag ? this.zipDetails.city : '');
        this.contactForm
          .get('country')
          .setValue(responseFlag ? this.zipDetails.country : '');
        this.contactForm
          .get('county')
          .setValue(responseFlag ? this.zipDetails.county : '');
        this.contactForm
          .get('timeZone')
          .setValue(responseFlag ? this.zipDetails.timeZone : '');
        this.contactForm
          .get('state')
          .setValue(responseFlag ? this.zipDetails.state : '');
      });
    }
  }
  // to update Functionality
  // private previousBasicInfo(): void {
  //   this.previousPsDetails = JSON.parse(sessionStorage.getItem('psDetails'));
  //   // this.psId = this.previousPsDetails.psId;
  //   // let parameters = { 'psId': this.previousPsDetails.psId }
  //   this.psId = 23448;
  //   let parameters = { psId: 23448 };
  //   try {
  //     this.service.getPsDetails(JSON.stringify(parameters)).subscribe((res) => {
  //       this.basicPreviousDetails = res;
  //       console.log(this.basicPreviousDetails);
  //       this.contactForm
  //         .get('saluationId')
  //         .setValue(this.basicPreviousDetails.SALUTATIONId);
  //       this.contactForm
  //         .get('saluation')
  //         .setValue(this.basicPreviousDetails.SALUTATION);
  //       this.contactForm
  //         .get('firstName')
  //         .setValue(this.basicPreviousDetails.firstname);
  //       this.contactForm
  //         .get('lastName')
  //         .setValue(this.basicPreviousDetails.lastname);
  //       this.contactForm.get('dob').setValue(this.basicPreviousDetails.dob);
  //       this.contactForm
  //         .get('genderId')
  //         .setValue(this.basicPreviousDetails.genderId);
  //       this.contactForm
  //         .get('gender')
  //         .setValue(this.basicPreviousDetails.gender);
        
       
  //       this.contactForm
  //         .get('city')
  //         .setValue(this.basicPreviousDetails.county);
  //       this.contactForm
  //         .get('country')
  //         .setValue(this.basicPreviousDetails.country);
  //       // this.basicEditForm.get('countyId').setValue(this.basicPreviousDetails.countyId);
  //       this.contactForm
  //         .get('county')
  //         .setValue(this.basicPreviousDetails.county);
  //       this.contactForm
  //         .get('timeZone')
  //         .setValue(this.basicPreviousDetails.timezone);
  //       // this.basicEditForm.get('timeZoneId').setValue(this.basicPreviousDetails.TIMEZONEID);
  //       this.contactForm
  //         .get('state')
  //         .setValue(this.basicPreviousDetails.state);
  //       //  this.basicEditForm.get('stateId').setValue(this.basicPreviousDetails.stateId);
  //       this.contactForm
  //         .get('addressTypeList')
  //         .setValue(this.basicPreviousDetails.locationId);
  //       this.contactForm
  //         .get('phonetype')
  //         .setValue(this.basicPreviousDetails.PHONETYPE);
  //       this.contactForm
  //         .get('phoneTypeList')
  //         .setValue(this.basicPreviousDetails.PHONETYPE);
  //       this.contactForm
  //         .get('addressLine1')
  //         .setValue(this.basicPreviousDetails.street);
  //       this.contactForm
  //         .get('addressLine2')
  //         .setValue(this.basicPreviousDetails.addressLine2);
  //       // this.basicEditForm.get('phonetype3').setValue(this.basicPreviousDetails.PHONETYPE);
  //       // this.basicEditForm.get('phoneTypeList3').setValue(this.basicPreviousDetails.PHONETYPE);
  //       this.contactForm
  //         .get('number')
  //         .setValue(this.basicPreviousDetails.PHONE);
  //       this.contactForm
  //         .get('zipcode')
  //         .setValue(this.basicPreviousDetails.ZIPCODE);
  //       this.contactForm
  //         .get('location')
  //         .setValue(this.basicPreviousDetails.locationName);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // public psIdSelect(i): void {
  //   this.contactForm.get('site').setValue(this.siteSelectedItems[i].id);
  //   this.siteId = this.siteSelectedItems[i].id;
  //   this.contactForm
  //     .get('siteName')
  //     .setValue(this.siteSelectedItems[i].siteName);
  // }
  // public siteListDeSelect(): void {
  //   this.siteSelectedItems.length = 0;
  //   this.contactForm.get('site').setValue('');
  //   this.siteId = null;
  //   this.contactForm.get('siteName').setValue('');
  // }

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
        this.contactForm.get('number').setValue(numbers.join('-'));
      } else if (flag == 'ssn') {
        this.contactForm.get('ssn').setValue(numbers.join('-'));
      } else if (flag == 'phone2') {
        this.contactForm.get('number2').setValue(numbers.join('-'));
      } else if (flag == 'phone3') {
        this.contactForm.get('number3').setValue(numbers.join('-'));
      }
    }
  }

  private phoneValidation() {
    let phone1Flag: boolean;
    let phone2Flag: boolean;
    let phone3Flag: boolean;
    if (
      (this.contactForm.value.number != undefined || null) &&
      this.contactForm.value.number.length > 0
    ) {
      console.log('phone1', this.contactForm.value.number.length);
      if (this.contactForm.value.number.length == 12) {
        var phone1areacode = this.contactForm.value.number.slice(0, 3);
        var phone1exchangecode = this.contactForm.value.number.slice(4, 7);
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
      (this.contactForm.value.number2 != undefined || null) &&
      this.contactForm.value.number2.length > 0
    ) {
      console.log('phone2', this.contactForm.value.number2.length);
      if (this.contactForm.value.number2.length == 12) {
        var phone2areacode = this.contactForm.value.number2.slice(0, 3);
        var phone2exchangecode = this.contactForm.value.number2.slice(4, 7);
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
      (this.contactForm.value.number3 != undefined || null) &&
      this.contactForm.value.number3.length > 0
    ) {
      console.log('phone3', this.contactForm.value.number3.length);
      if (this.contactForm.value.number3.length == 12) {
        var phone3areacode = this.contactForm.value.number3.slice(0, 3);
        var phone3exchangecode = this.contactForm.value.number3.slice(4, 7);
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
      let ssnLength = this.contactForm.value.ssn.length;
      ssnLength == 0 ? this.saveBasic() : this.checkSSn();

      console.log('all are valid phone nums');
    }
  }
  private alertbox(string) {
    var message = 'Invalid Number';
    swal.fire(message, string, 'warning');
  }
  private checkSSn() {
    if (this.contactForm.value.ssn.replace(/-/g, '') == 999999999) {
      console.log('ssn ERRor');
      swal.fire({
        title: 'Invalid SSN',
        text: "SSN should not contain all 9's",
        icon: 'warning',
        confirmButtonText: 'Ok',
        allowOutsideClick: false,
      });
    } else {
      try {
        let params = { ssn: this.contactForm.value.ssn, screenFlag: 'ps' };
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
                confirmButtonText: 'Ok',
                allowOutsideClick: false,
              });
            } else {
              this.saveBasic();
            }
          });
      } catch (error) {}
    }
  }
}