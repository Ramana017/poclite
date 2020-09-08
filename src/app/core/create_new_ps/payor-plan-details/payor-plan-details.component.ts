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
  payorPlanForm: FormGroup;
  salutationid: number;
  lookupDetails: any;
  relationshipList;
  saluationId: any;
  addressTypeList: any;
  checked1;
  public payorData;
  maritalStatusList: any;
  raceId: any;
  user1;
  phoneTypeList: any;
  genderId: any;
  checked;
  data;
  addressid;
  locationName;
  siteId;
  raceid;
  payorKeyword = 'payorPlanId';
  Keyword = 'label';
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
  previousPsDetails: any;
  constructor(private fb: FormBuilder, public service: ZipcodeService, public date: DatePipe) { }
  ngOnInit() {
    this.getPayorPlanData();
    this.payorPlanForm = this.fb.group({

      genderId: ['', Validators.required],
      policyNumber: [''],
      payorCode: [''],
      plancode: [''],
      payorPlan: [''],
      rank: [''],
      effectiveFrom: [''],
      effectiveto: [''],
      phone: [''],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      relationshipList: [''],
      relation: [''],
      gender: [''],
      ssn: [''],
      address: [''],
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
    return this.payorPlanForm.controls;

  }

  onSubmit() {
    this.submitted = true;

    console.log(this.payorPlanForm.value)
    this.user = JSON.parse(localStorage.getItem('regis'));

    // this.service.savePs(JSON.stringify(jsonObj)).subscribe(res => {
    //   console.log(res, 'getting the saved ps details')
    // })
  }
  public getPayorPlanData(): void {
    let params = { "officeId": 191, "privateDuty": 0 }
    this.service.getPayorPlanList(JSON.stringify(params)).subscribe(
      data => {
        //   debugger;
        this.payorData = data

        console.log(data);
      })
  }
  basicDetails() {
    let jsonObj = { 'userId': '47' };
    this.service.getLookupDetails(JSON.stringify(jsonObj)).subscribe(data => {
      this.lookupDetails = data;
      console.log(this.lookupDetails);
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
      this.payorPlanForm.get('genderId').setValue(event.id);
    }
    if (field === 'site') {
      this.payorPlanForm.get('site').setValue(event.id),
        this.siteId = event.id;
      // console.log(this.siteId);
    }

    if (field === 'relationshipList') {
      this.payorPlanForm.get('relationshipList').setValue(event.id);
    }

    if (field === 'addressTypeList') {
      this.payorPlanForm.get('addressTypeList').setValue(event.id);
      this.locationName = event.label;

    }
    if (field === 'phoneTypeList') {
      this.payorPlanForm.get('phoneTypeList').setValue(event.id);
      this.phone = event.label;
    }
    if (field === 'state') {
      this.payorPlanForm.get('phoneTypeList').setValue(event.id);
    }


  }

  getzip(event) {
    const zip = this.payorPlanForm.get('zipcode').value;
    console.log(zip)
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
      // this.service.getbasic.subscribe(res=>{
      //   console.log(res)
      //   if(res !== null){
      // this.service.getbasic.next(res)
      //   this.authorizationForm.patchValue(res)
      //   this.authorizationForm.get('city').setValue(res.county);
      //   }
      // })
      try {
        this.previousPsDetails = JSON.parse(sessionStorage.getItem('psDetails'));
        let parameters = { 'psId': this.previousPsDetails.psId }
        this.service.getPsDetails(JSON.stringify(parameters)).subscribe(res => {
          console.log(res)
          let s = res;
          // this.authorizationForm.get('addressTypeList').setValue(s.addressTypeList1);
          this.payorPlanForm.get('number').setValue(s.number);
          this.payorPlanForm.get('zipcode').setValue(s.zipcode);
          this.payorPlanForm.get('lane').setValue(s.lane);
          this.payorPlanForm.get('lastName').setValue(s.lastname);
          this.payorPlanForm.get('firstName').setValue(s.firstName);
          this.payorPlanForm.get('city').setValue(s.city);
          this.payorPlanForm.get('phone').setValue(s.numberName);
          this.payorPlanForm.get('county').setValue(s.countyName);
          this.payorPlanForm.get('state').setValue(s.state);
          this.payorPlanForm.get('timeZone').setValue(s.timeZone);
          this.payorPlanForm.get('country').setValue(s.country);
          this.payorPlanForm.get('address').setValue(s.addressTypeList1);
          this.payorPlanForm.get('dob1').setValue(s.dob1);
          this.payorPlanForm.get('gender').setValue(s.genderName);
          //this.payorPlanForm.get('relation').setValue(s.relationname);
          //    this.guarantorForm.get('phoneTypeList').setValue(s.numberName);
          //    this.get2('', true)
        })
      } catch (error) {
        console.log(error)
      }


    } else {
      this.checked = false;
      this.checked1 = false;
      //    this.authorizationForm.value=null
      // this.authorizationForm.get('addressTypeList').setValue('');
      // this.authorizationForm.get('phoneTypeList').setValue('');
      // this.authorizationForm.get('number').setValue('');
      // this.authorizationForm.get('zipcode').setValue('');
      // this.authorizationForm.get('lane').setValue('');
      // this.authorizationForm.get('lastName').setValue('');
      // this.authorizationForm.get('firstName').setValue('');
      // this.authorizationForm.get('city').setValue('');
      // this.authorizationForm.get('phone').setValue('');
      // this.authorizationForm.get('county').setValue('');
      // this.authorizationForm.get('state').setValue('');
      // this.authorizationForm.get('timeZone').setValue('');
      // this.authorizationForm.get('country').setValue('');
      // this.authorizationForm.get('address').setValue('');
      // this.authorizationForm.get('dob').setValue('');
      // this.authorizationForm.get('gender').setValue('');
      // this.authorizationForm.get('relation').setValue('');

      // this.relationAuto.clear();
      // this.relationAuto.close();
      // this.ocuupationAuto.clear();
      // this.ocuupationAuto.close();
      // this.get2('', false)
    }
  }
}
