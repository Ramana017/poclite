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
  private countryId: any;
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
  public stateId;
  public countyId;
  public timeZoneId;
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
  public phoneNUmber;
  public formError: boolean = false;
  private userId: number;
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
      language:['',Validators.required],
      languageId:['',Validators.required],
      genderId: ['', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      raceId: ['', Validators.required],
      ssn: [''],
      addressLine2: [''],
      number: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
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
    this.formError = true;

    console.log("#########", this.basicForm.get('gender').invalid)
    console.log(this.basicForm.valid)
    console.log(this.basicForm.value)
    let obj = this.basicForm.value;
    let stateId = obj

    if (this.basicForm.valid) {
      let mappedArray = this.siteSelectedItems.length > 0 ? (this.siteSelectedItems.map(a => a.id)) : [0];

      const jsonObj = {
        "psId": this.psId,
        "saluationId": (this.basicForm.value.saluationId),
        "genderId": (this.basicForm.value.genderId),
        "lastName": (this.basicForm.value.lastName),
        "firstName": (this.basicForm.value.firstName),
        "raceId": (this.basicForm.value.raceId),
        "maritalStatusID": (this.basicForm.value.maritalStatusList),
        "dob": this.date.transform(this.basicForm.value.dob, 'MM/dd/yyyy'),
        "ssn": this.basicForm.value.ssn,
        "languageId":+(this.basicForm.value.languageId),
        "locationId": (this.basicForm.value.addressTypeList),
        "city": (this.basicForm.value.city),
        "addressLine": (this.basicForm.value.lane),
        "addressLine2": this.basicForm.value.addressLine2,
        "zipcode": (this.basicForm.value.zipcode),
        "phoneTypeid": (this.basicForm.value.phoneTypeList),
        "phone": (this.basicForm.value.number),
        "stateId": this.stateId,
        "countyId": this.countyId,
        "timeZoneId": this.timeZoneId,
        "countryId": this.countryId,
        "officeId": (this.siteId),
        "mappedOfficeIds": mappedArray.toString(),
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
              this.router.navigateByUrl('registration-re/child-guarantor');
            }
          }
        });
      } catch (error) {
        console.log(error);

      }

    } else {
      // alert('Fill the required fields');
      if (this.basicForm.get('genderId').value == "") {
        console.log("ramanaa")
      }

      console.log("++++++++++", this.basicForm.get('gender').value.type)

      swal.fire({
        title: 'Invalid Form',
        text: 'Fill all the Required fields',
        icon: 'error',
        confirmButtonText: 'Ok',
        allowOutsideClick: false
      })
      console.log(this.basicForm.value)

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
  public basicDetails() {
    this.service.getLookupsData3().subscribe(data => {
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
        this.basicForm.get('genderId').setValue(event.id);
        event.label == "MALE" ? this.basicForm.get('saluationId').setValue("MS") : this.basicForm.get('saluationId').setValue("MR");
        event.label == "MALE" ? this.basicForm.get('saluation').setValue("MR") : this.basicForm.get('saluation').setValue("MS");
      } else {
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
    console.log(zip);
    if (zip.length === 5) {
      this.service.getZipcodeDetails(zip).subscribe(data => {
        if (Object.keys(data).length !== 0) {
          this.zipDetails = data;
          console.log(data)
          this.stateId = data.stateId
          this.countyId = data.countyId;
          this.timeZoneId = data.timeZoneId;
          this.countryId =data.countryId;
          console.log()
          this.basicForm.get('city').setValue(this.zipDetails.city);
          this.basicForm.get('country').setValue(this.zipDetails.country);
          this.basicForm.get('county').setValue(this.zipDetails.county);
          this.basicForm.get('timeZone').setValue(this.zipDetails.timeZone);
          this.basicForm.get('state').setValue(this.zipDetails.state);
        }

        else {
          swal.fire({
            title: 'Invalid pincode',
            text: 'Invalid ZIP code. Please enter a valid ZIP code.',
            icon: 'warning',
            confirmButtonText: 'Ok',
            allowOutsideClick: false
          })
          this.basicForm.get('zipcode').setValue('');
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

  public PhoneNumFormat(event) {
    console.log("++++++++++", event.target.value)
    var input2 = event.target.value;
    var input = input2.replaceAll("[^\\d.]", "");
    if (input != undefined) {
      let trimmed = input.replace(/\s+/g, '');
      console.log(input)
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

      this.phoneNUmber = numbers.join('-');
      this.basicForm.get('number').setValue(numbers.join('-'));
    }
  }

}
