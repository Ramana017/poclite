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
  styleUrls: ['./ps-basic.component.sass']
})
export class PsBasicComponent implements OnInit {

  // constructor() { }

  // ngOnInit(): void {
  // }
  @Input() popup: boolean;
  modelref: BsModalRef;
  public psId: number = 0;
  public officeList: any;
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
    text: "Site Name",
    enableSearchFilter: true,
    labelKey: 'siteName',
    primaryKey: 'id',
    class: 'checkbox-list',
    showCheckbox: true

  };
  public currentDate: Date = new Date()
  public phoneNUmber;
  public phoneNUmber2;
  public phoneNUmber3;
  public formError: boolean = false;
  private userId: number;
  public mappedArray: Array<any>;
  // tslint:disable-next-line: max-line-length
  constructor(private fb: FormBuilder, public modalService: BsModalService, public service: ZipcodeService, public date: DatePipe, private router: Router, private http: HttpClient) {
    console.log("basic constructer", this.popup);
    let data: any = this.userId = JSON.parse(sessionStorage.getItem("useraccount"));
    this.userId = data.userId
    this.newForm();
    // let userExist = sessionStorage.getItem('psDetails');
    // if (userExist) {
    //   this.previousBasicInfo();
    // }+6


  }
  ngOnInit() {
    this.previousBasicInfo();
    console.log("basic", this.userMappedOffices.length === 0);
    this.getUserOfficeList();
    this.basicDetails();
  }

  private newForm(): void {
    this.basicEditForm = this.fb.group({
      location: ['', Validators.required],
      phonetype: ['', Validators.required],
      phonetype2: ['', Validators.required],
      phonetype3: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      race: ['', Validators.required],
      gender: ['', Validators.required],
      saluation: ['', Validators.required],
      saluationId: ['', Validators.required],
      middleName: [''],
      alias: [''],
      site: [''],
      language: ['', Validators.required],
      languageId: ['', Validators.required],
      genderId: ['', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      raceId: ['', Validators.required],
      ssn: [''],
      addressLine2: [''],
      number: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      number2: [''],
      number3: [''],
      maritalStatusList: ['', Validators.required],
      addressTypeList: ['', Validators.required],
      phoneTypeList: ['', Validators.required],
      phoneTypeList2: ['', Validators.required],
      phoneTypeList3: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
      country: ['', Validators.required],
      county: ['', Validators.required],
      state: ['', Validators.required],
      timeZone: ['', Validators.required],
      lane: ['', Validators.required],
      dob: ['', Validators.required],
      siteName: [''],
      fax: [''],
      email: ['']
    });
  }
  get f() {
    return this.basicEditForm.controls;

   }
  dob1;
  public onSubmit(): void {
    console.log(this.basicEditForm.value)
    this.basicEditForm.get('dob').value > this.currentDate ? this.basicEditForm.get('dob').setValue(this.currentDate) : '';
    this.mappedArray = [];
    this.formError = true;
    this.phoneNUmber = this.basicEditForm.value.number;
    this.phoneNUmber2 = this.basicEditForm.value.number2;
    this.phoneNUmber3 = this.basicEditForm.value.number3;
    this.mappedArray = this.siteSelectedItems.length > 0 ? (this.siteSelectedItems.map(a => a.id)) : [0];
    let siteFlag = this.mappedArray.includes(this.siteId);
    let ssnLength = this.basicEditForm.value.ssn.length;
    if (this.basicEditForm.valid && siteFlag) {
      if (this.phoneNUmber.length == 10) {
        var phone1areacode = this.phoneNUmber.slice(0, 3);
        var phone1exchangecode = this.phoneNUmber.slice(3, 6)
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
      if (this.phoneNUmber2.length == 10) {
        var phone1areacode = this.phoneNUmber2.slice(0, 3);
        var phone1exchangecode = this.phoneNUmber2.slice(3, 6)
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
      if (this.phoneNUmber3.length == 10) {
        var phone3areacode = this.phoneNUmber3.slice(0, 3);
        var phone3exchangecode = this.phoneNUmber.slice(3, 6)
        if (phone3areacode >= 199 && phone3exchangecode >= 199) {
          console.log("phone number is correct");
          ssnLength == 0 ? this.saveBasic() : this.checkSSn();

        }
        else {
          // phone1Flag = true;
          if (phone3areacode <= 1 || phone3areacode <= 199) {
            console.log("area code missing")
            this.alertbox("Area Code (first 3 digits) should not be in between 001 and 199 for Phone ")
          }
          if (phone3exchangecode <= 1 || phone3exchangecode <= 199) {
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
    else if (this.basicEditForm.invalid || this.siteSelectedItems.length == 0) {
      // alert('Fill the required fields');
      swal.fire({
        title: 'Invalid Form',
        text: 'Fill all the Required fields',
        icon: 'error',
        confirmButtonText: 'Ok',
        allowOutsideClick: false
      })
      console.log(this.basicEditForm.value)

    }
    else if (!siteFlag) {
      swal.fire({
        title: 'Invalid Mapped Sites',
        text: 'Please select the Home Site',
        icon: 'error',
        confirmButtonText: 'Ok',
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
      "saluationId": (this.basicEditForm.value.saluationId),
      "genderId": (this.basicEditForm.value.genderId),
      "lastName": (this.basicEditForm.value.lastName),
      "firstName": (this.basicEditForm.value.firstName),
      "raceId": (this.basicEditForm.value.raceId),
      "maritalStatusID": (this.basicEditForm.value.maritalStatusList),
      "dob": this.date.transform(this.basicEditForm.value.dob, 'MM/dd/yyyy'),
      "ssn": this.basicEditForm.value.ssn,
      "languageId": +(this.basicEditForm.value.languageId),
      "locationId": (this.basicEditForm.value.addressTypeList),
      "city": (this.basicEditForm.value.city),
      "addressLine": (this.basicEditForm.value.lane),
      "addressLine2": this.basicEditForm.value.addressLine2,
      "zipcode": (this.basicEditForm.value.zipcode),
      "phoneTypeid": (this.basicEditForm.value.phoneTypeList),
      "phone": (this.basicEditForm.value.number),
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
            this.router.navigateByUrl('registration-re/child-guarantor');
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
        this.basicEditForm.get('genderId').setValue(event.id);
        if (event.name == "MALE") {
          this.basicEditForm.get('saluation').setValue(flag ? "MR" : '');
          this.basicEditForm.get('saluationId').setValue(flag ? "MR" : '');
        } else if (event.name == "FEMALE") {
          this.basicEditForm.get('saluation').setValue(flag ? "MS" : '');
          this.basicEditForm.get('saluationId').setValue(flag ? "MS" : '');
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
      flag ? this.basicEditForm.get('raceId').setValue(event.id) : this.basicEditForm.get('raceId').setValue('');;
    }
    if (field === 'maritalStatusList') {
      flag ? this.basicEditForm.get('maritalStatusList').setValue(event.id) : this.basicEditForm.get('maritalStatusList').setValue('');
    }
    if (field === 'saluationId') {
      flag ? this.basicEditForm.get('saluationId').setValue(event.id) : this.basicEditForm.get('saluationId').setValue('');
    }
    if (field === 'addressTypeList') {
      flag ? this.basicEditForm.get('addressTypeList').setValue(event.id) : this.basicEditForm.get('addressTypeList').setValue('');
      this.locationName = event.label;

    }
    if (field === 'phoneTypeList') {
      flag ? this.basicEditForm.get('phoneTypeList').setValue(event.id) : this.basicEditForm.get('phoneTypeList').setValue('');
    }
    if (field === 'phoneTypeList2') {
      flag ? this.basicEditForm.get('phoneTypeList2').setValue(event.id) : this.basicEditForm.get('phoneTypeList2').setValue('');
    }
    if (field === 'phoneTypeList3') {
      flag ? this.basicEditForm.get('phoneTypeList3').setValue(event.id) : this.basicEditForm.get('phoneTypeList3').setValue('');
    }
    // if (field === 'state') {
    //   flag ? this.basicEditForm.get('phoneTypeList').setValue(event.id) : this.basicEditForm.get('phoneTypeList').setValue('');
    // }
    if (field === 'languageId') {
      flag ? this.basicEditForm.get('languageId').setValue(event.id) : this.basicEditForm.get('languageId').setValue('');
    }

  }

  getzip(): void {
    const zip = this.basicEditForm.get('zipcode').value;
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
          this.basicEditForm.get('city').setValue(this.zipDetails.city);
          this.basicEditForm.get('country').setValue(this.zipDetails.country);
          this.basicEditForm.get('county').setValue(this.zipDetails.county);
          this.basicEditForm.get('timeZone').setValue(this.zipDetails.timeZone);
          this.basicEditForm.get('state').setValue(this.zipDetails.state);
        }

        else {
          swal.fire({
            title: 'Invalid Zip Code',
            text: 'Please enter a valid Zip code.',
            icon: 'warning',
            confirmButtonText: 'Ok',
            allowOutsideClick: false
          })
          this.basicEditForm.get('city').setValue('');
          this.basicEditForm.get('country').setValue('');
          this.basicEditForm.get('county').setValue('');
          this.basicEditForm.get('timeZone').setValue('');
          this.basicEditForm.get('state').setValue('');
          this.basicEditForm.get('zipcode').setValue('');
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
    // this.psId = this.previousPsDetails.psId;
    // let parameters = { 'psId': this.previousPsDetails.psId }
    this.psId = 23448;
    let parameters = { 'psId': 23448}
    try {
      this.service.getPsDetails(JSON.stringify(parameters)).subscribe(res => {
        this.basicPreviousDetails = res;
        console.log(this.basicPreviousDetails);
        this.basicEditForm.get('saluationId').setValue(this.basicPreviousDetails.SALUTATIONId);
        this.basicEditForm.get('saluation').setValue(this.basicPreviousDetails.SALUTATION);
        this.basicEditForm.get('firstName').setValue(this.basicPreviousDetails.firstname);
        this.basicEditForm.get('lastName').setValue(this.basicPreviousDetails.lastname);
        this.basicEditForm.get('dob').setValue(this.basicPreviousDetails.dob);
        this.basicEditForm.get('genderId').setValue(this.basicPreviousDetails.genderId);
        this.basicEditForm.get('gender').setValue(this.basicPreviousDetails.gender);
        this.basicEditForm.get('raceId').setValue(this.basicPreviousDetails.raceId);
        //   this.basicEditForm.get('race').setValue(this.basicPreviousDetails.race);
        this.basicEditForm.get('language').setValue(this.basicPreviousDetails.language);
        this.basicEditForm.get('languageId').setValue(this.basicPreviousDetails.languageId);
        this.basicEditForm.get('maritalStatus').setValue(this.basicPreviousDetails.MARITIALSTATUS);
        this.basicEditForm.get('maritalStatusList').setValue(this.basicPreviousDetails.MARITIALSTATUSId);
        this.basicEditForm.get('city').setValue(this.basicPreviousDetails.county);
        this.basicEditForm.get('country').setValue(this.basicPreviousDetails.country);
        this.basicEditForm.get('countyId').setValue(this.countyId);
        this.basicEditForm.get('county').setValue(this.basicPreviousDetails.county);
        this.basicEditForm.get('timeZone').setValue(this.basicPreviousDetails.timezone);
        this.basicEditForm.get('timeZoneId').setValue(this.timeZoneId);
        this.basicEditForm.get('state').setValue(this.basicPreviousDetails.state);
        this.basicEditForm.get('stateId').setValue(this.stateId);
        this.basicEditForm.get('addressTypeList').setValue(this.basicPreviousDetails.locationId);
        this.basicEditForm.get('phonetype').setValue(this.basicPreviousDetails.PHONETYPE);
        this.basicEditForm.get('phoneTypeList').setValue(this.basicPreviousDetails.PHONETYPE);
        this.basicEditForm.get('phonetype2').setValue(this.basicPreviousDetails.PHONETYPE);
        this.basicEditForm.get('phoneTypeList2').setValue(this.basicPreviousDetails.PHONETYPE);
        this.basicEditForm.get('phonetype3').setValue(this.basicPreviousDetails.PHONETYPE);
        this.basicEditForm.get('phoneTypeList3').setValue(this.basicPreviousDetails.PHONETYPE);
        this.basicEditForm.get('number').setValue(this.basicPreviousDetails.PHONE);
        this.basicEditForm.get('zipcode').setValue(this.basicPreviousDetails.ZIPCODE);
        this.basicEditForm.get('location').setValue(this.basicPreviousDetails.locationName);

      });
    } catch (error) {
      console.log(error);
    }
  }

  public psIdSelect(i): void {
    this.basicEditForm.get('site').setValue(this.siteSelectedItems[i].id);
    this.siteId = this.siteSelectedItems[i].id;
    this.basicEditForm.get('siteName').setValue(this.siteSelectedItems[i].siteName);
  }
  public siteListDeSelect(): void {
    this.siteSelectedItems.length = 0;
    this.basicEditForm.get('site').setValue('');
    this.siteId = null;
    this.basicEditForm.get('siteName').setValue('');
  }

  public PhoneNumFormat(event, flag) {
    // console.log("++++++++++", event.target.value)
    var input2 = event.target.value.replace(/\D/g, '');
    flag == "ssn" ? this.basicEditForm.get('ssn').setValue(input2) : this.basicEditForm.get('number').setValue(input2);
  }
  public phoneValidation() {
    let phone1Flag
    let phone2Flag
    let phone3Flag
    if (this.phoneNUmber != undefined && this.phoneNUmber.length > 0) {

      console.log("phone1", this.phoneNUmber.length)
      if (this.phoneNUmber.length == 10) {
        var phone1areacode = this.phoneNUmber.slice(0, 3);
        var phone1exchangecode = this.phoneNUmber.slice(4, 7)
        if ((phone1areacode >= 1 && phone1areacode >= 199) && (phone1exchangecode >= 1 && phone1exchangecode >= 199)) {
          phone1Flag = false;
        }
        else {
          phone1Flag = true;
          if (phone1areacode >= 1 && phone1areacode >= 199) {
            this.alertbox("Area Code (first 3 digits) should not be in between 001 and 199 for Phone  ")
          }
          if (phone1exchangecode >= 1 && phone1exchangecode >= 199) {
            this.alertbox("Exchange (middle 3 digits)  should not be in between 001 and 199 for Phone  or Phone 3")
          }

        }
        console.log("phone1 flag is", phone1Flag)
      }
      else {
        phone1Flag = true;
        this.alertbox('Phone1 should be 10 digits')
      }

    }
    if (this.phoneNUmber2 != undefined && this.phoneNUmber2.length > 0) {

      console.log("phone1", this.phoneNUmber2.length)
      if (this.phoneNUmber2.length == 10) {
        var phone2areacode = this.phoneNUmber2.slice(0, 3);
        var phone2exchangecode = this.phoneNUmber2.slice(4, 7)
        if ((phone2areacode >= 1 && phone2areacode >= 199) && (phone2exchangecode >= 1 && phone2exchangecode >= 199)) {
          phone2Flag = false;
        }
        else {
          phone2Flag = true;
          if (phone2areacode >= 1 && phone2areacode >= 199) {
            this.alertbox("Area Code (first 3 digits) should not be in between 001 and 199 for Phone  ")
          }
          if (phone2exchangecode >= 1 && phone2exchangecode >= 199) {
            this.alertbox("Exchange (middle 3 digits)  should not be in between 001 and 199 for Phone  or Phone 3")
          }

        }
        console.log("phone1 flag is", phone2Flag)
      }
      else {
        phone2Flag = true;
        this.alertbox('Phone1 should be 10 digits')
      }

    }
    if (this.phoneNUmber3 != undefined && this.phoneNUmber3.length > 0) {

      console.log("phone1", this.phoneNUmber3.length)
      if (this.phoneNUmber3.length == 10) {
        var phone3areacode = this.phoneNUmber3.slice(0, 3);
        var phone3exchangecode = this.phoneNUmber3.slice(4, 7)
        if ((phone3areacode >= 1 && phone3areacode >= 199) && (phone3exchangecode >= 1 && phone3exchangecode >= 199)) {
          phone3Flag = false;
        }
        else {
          phone3Flag = true;
          if (phone3areacode >= 1 && phone3areacode >= 199) {
            this.alertbox("Area Code (first 3 digits) should not be in between 001 and 199 for Phone  ")
          }
          if (phone3exchangecode >= 1 && phone3exchangecode >= 199) {
            this.alertbox("Exchange (middle 3 digits)  should not be in between 001 and 199 for Phone  or Phone 3")
          }

        }
        console.log("phone1 flag is", phone1Flag)
      }
      else {
        phone3Flag = true;
        this.alertbox('Phone1 should be 10 digits')
      }

    }
  }
  private alertbox(string) {
    var message = 'Invalid Number'
    swal.fire(message, string, 'warning')
  }
  private checkSSn() {
    if (this.basicEditForm.value.ssn == 999999999) {

      console.log("ssn ERRor")
      swal.fire({
        title: 'Invalid SSN',
        text: "SSN should not contain all 9's",
        icon: 'warning',
        confirmButtonText: 'Ok',
        allowOutsideClick: false
      })

    } else {
      try {
        let params = { 'ssn': this.basicEditForm.value.ssn, "screenFlag": "ps" }
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
            this.saveBasic()
          }
        })
      } catch (error) {

      }
    }
  }
}
