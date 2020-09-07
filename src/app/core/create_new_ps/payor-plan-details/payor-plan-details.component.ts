import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ZipcodeService } from '../../../services/zipcode.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-payor-plan-details',
  templateUrl: './payor-plan-details.component.html',
  styleUrls: ['./payor-plan-details.component.scss']
})
export class PayorPlanDetailsComponent implements OnInit {


  title = 'Form';
  authorizationForm: FormGroup;
  salutationid: number;
  lookupDetails: any;
  relationshipList;
  saluationId: any;
  addressTypeList: any;
  checked1;
  maritalStatusList: any;
  raceId: any;
  user1;
  phoneTypeList: any;
  genderId: any;
  checked;
  Keyword = 'label';
  data;
  addressid;
  locationName;
  siteId;
  raceid;

  fill;
  city;
  zipDetails;
  country;
  timeZone;
  userMappedOffices;
  state;
  county;
  regis;
  keyword1 = 'siteName';
  user;
  all: any = [];
  phone;
  submitted = false;
  constructor(private fb: FormBuilder, public service: ZipcodeService, public date: DatePipe) { }
  ngOnInit() {

    this.authorizationForm = this.fb.group({

      genderId: ['', Validators.required],
      policyNumber:[''],
      payorCode:[''],
      plancode:[''],
      payorPlan:[''],
      rank:[''],
      effectiveFrom:[''],
      effectiveto:[''],
      phone:[''],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      relationshipList:[''],
      relation:[''],
      gender:[''],
      ssn: [''],
      address:[''],
      number: ['', Validators.required],
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
    });
    this.basicDetails();
  }
  get f() {
    return this.authorizationForm.controls;

  }

  onSubmit() {
    this.submitted = true;

    // const obj = this.authorizationForm.value;
    // obj.stateName = this.zipDetails.state;
    // obj.countyName = this.zipDetails.county;
    // obj.timeZone = this.zipDetails.timeZone;
    // obj.addressTypeList1 = this.locationName;
    // obj.numberName = this.phone;
    // obj.site = this.siteId;
    // if (this.authorizationForm.valid) {
    //   this.regis = this.authorizationForm.value;
    // } else {
    //   alert('Fill the required fields');
    // }
    console.log(this.authorizationForm.value)
    //   localStorage.setItem('regis', JSON.stringify(obj));
    this.user = JSON.parse(localStorage.getItem('regis'));
    // tslint:disable-next-line: align

    // this.service.savePs(JSON.stringify(jsonObj)).subscribe(res => {
    //   console.log(res, 'getting the saved ps details')
    // })
  }

  basicDetails() {
    let jsonObj = { 'userId': '47' };

    this.service.getLookupDetails(JSON.stringify(jsonObj)).subscribe(data => {
      this.lookupDetails = data;
      //   console.log(this.lookupDetails);
      this.saluationId = this.lookupDetails.salutationList;
      this.userMappedOffices = this.lookupDetails.userMappedOffices;

      this.addressTypeList = this.lookupDetails.addressTypeList;
      this.relationshipList = this.lookupDetails.relationshipList;
      this.maritalStatusList = this.lookupDetails.maritalStatusList;
      this.raceId = this.lookupDetails.raceList;
      this.phoneTypeList = this.lookupDetails.phoneTypeList;
      this.genderId = this.lookupDetails.raceList;


    });
  }

  selectChange(event, field) {

    if (field === 'genderId') {
      this.authorizationForm.get('genderId').setValue(event.id);
    }
    if (field === 'site') {
      this.authorizationForm.get('site').setValue(event.id),
        this.siteId = event.id;
      // console.log(this.siteId);
    }

    if (field === 'relationshipList') {
      this.authorizationForm.get('relationshipList').setValue(event.id);
    }

    if (field === 'addressTypeList') {
      this.authorizationForm.get('addressTypeList').setValue(event.id);
      this.locationName = event.label;

    }
    if (field === 'phoneTypeList') {
      this.authorizationForm.get('phoneTypeList').setValue(event.id);
      this.phone = event.label;
    }
    if (field === 'state') {
      this.authorizationForm.get('phoneTypeList').setValue(event.id);
    }


  }

  getzip(event) {
    const zip = this.authorizationForm.get('zipcode').value;
    //  console.log(zip)
    if (zip.length === 5) {
      this.service.getZipcodeDetails(zip).subscribe(data => {
        this.zipDetails = data;
        console.log(this.zipDetails)
        this.city = this.zipDetails.city;
        this.country = this.zipDetails.country;
        this.state = this.zipDetails.state;
        this.timeZone = this.zipDetails.timeZone;
        this.county = this.zipDetails.county;
      });
    }
  }

  get1(event) {
    if (event.target.checked) {
      this.checked = true;
      this.checked1 = true;
      this.user1 = JSON.parse(localStorage.getItem('regis1'));
      const s = JSON.parse(localStorage.getItem('regis'));
      const s1 = JSON.parse(localStorage.getItem('regis1'));
      console.log(s1);
      // this.authorizationForm.get('addressTypeList').setValue(s.addressTypeList1);
      this.authorizationForm.get('number').setValue(s.number);
      this.authorizationForm.get('zipcode').setValue(s.zipcode);
      this.authorizationForm.get('lane').setValue(s.lane);
      this.authorizationForm.get('lastName').setValue(s.lastName);
      this.authorizationForm.get('firstName').setValue(s.firstName);
      this.authorizationForm.get('city').setValue(s.city);
      this.authorizationForm.get('phone').setValue(s.numberName);
      this.authorizationForm.get('county').setValue(s.countyName);
      this.authorizationForm.get('state').setValue(s.state);
      this.authorizationForm.get('timeZone').setValue(s.timeZone);
      this.authorizationForm.get('country').setValue(s.country);
      this.authorizationForm.get('address').setValue(s.addressTypeList1);
      this.authorizationForm.get('dob').setValue(s.dob1);
      this.authorizationForm.get('gender').setValue(s.genderName);
      this.authorizationForm.get('relation').setValue(s1.relationname);
      //    this.guarantorForm.get('phoneTypeList').setValue(s.numberName);
      //    this.get2('', true)

    } else {
      this.checked = false;
      this.checked1 = false;
  //    this.authorizationForm.value=null
      this.authorizationForm.get('addressTypeList').setValue('');
      this.authorizationForm.get('phoneTypeList').setValue('');
      this.authorizationForm.get('number').setValue('');
      this.authorizationForm.get('zipcode').setValue('');
      this.authorizationForm.get('lane').setValue('');
      this.authorizationForm.get('lastName').setValue('');
      this.authorizationForm.get('firstName').setValue('');
      this.authorizationForm.get('city').setValue('');
      this.authorizationForm.get('phone').setValue('');
      this.authorizationForm.get('county').setValue('');
      this.authorizationForm.get('state').setValue('');
      this.authorizationForm.get('timeZone').setValue('');
      this.authorizationForm.get('country').setValue('');
      this.authorizationForm.get('address').setValue('');
      this.authorizationForm.get('dob').setValue('');
      this.authorizationForm.get('gender').setValue('');
      this.authorizationForm.get('relation').setValue('');
      this.user = null;
      this.user1 = null;
      // this.relationAuto.clear();
      // this.relationAuto.close();
      // this.ocuupationAuto.clear();
      // this.ocuupationAuto.close();
      // this.get2('', false)
    }
  }
}
