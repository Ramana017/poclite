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
  previousPsDetails: any;
  basicPreviousData: any;
  constructor(private fb: FormBuilder, public service: ZipcodeService, public date: DatePipe) { }
  ngOnInit() {
    this.getPayorPlanData();
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

    console.log(this.authorizationForm.value)
    this.user = JSON.parse(localStorage.getItem('regis'));

    // this.service.savePs(JSON.stringify(jsonObj)).subscribe(res => {
    //   console.log(res, 'getting the saved ps details')
    // })
  }
  public getPayorPlanData(): void {
    let params = {"officeId":191,"privateDuty":0}
    this.service.getPayorPlanList(JSON.stringify(params)).subscribe(
      data => {
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
  private getPsDetails(): void {
    try {
      this.previousPsDetails = JSON.parse(sessionStorage.getItem('psDetails'));
      let parameters = { 'psId': this.previousPsDetails.psId }
      this.service.getPsDetails(JSON.stringify(parameters)).subscribe(res => {
        console.log(res)
        this.service.getbasic.next(res)
        this.basicPreviousData = res;
        this.authorizationForm.get('saluationId').setValue(this.basicPreviousData.SALUTATIONId);
      })
    } catch (error) {
      console.log(error)
    }
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
      //   this.authorizationForm.patchValue(res)
      //   this.authorizationForm.get('city').setValue(res.county);

      //   }

      // })


      try {
        this.previousPsDetails = JSON.parse(sessionStorage.getItem('psDetails'));
        let parameters = { 'psId': this.previousPsDetails.psId }
        this.service.getPsDetails(JSON.stringify(parameters)).subscribe(res => {
          console.log(res)
          this.service.getbasic.next(res)
          this.basicPreviousData = res;
          this.authorizationForm.get('saluationId').setValue(this.basicPreviousData.SALUTATIONId);
        })
      } catch (error) {
        console.log(error)
      }
      // // this.authorizationForm.get('addressTypeList').setValue(s.addressTypeList1);
      // this.authorizationForm.get('number').setValue(s.number);
      // this.authorizationForm.get('zipcode').setValue(s.zipcode);
      // this.authorizationForm.get('lane').setValue(s.lane);
      // this.authorizationForm.get('lastName').setValue(s.lastName);
      // this.authorizationForm.get('firstName').setValue(s.firstName);
      // this.authorizationForm.get('city').setValue(s.city);
      // this.authorizationForm.get('phone').setValue(s.numberName);
      // this.authorizationForm.get('county').setValue(s.countyName);
      // this.authorizationForm.get('state').setValue(s.state);
      // this.authorizationForm.get('timeZone').setValue(s.timeZone);
      // this.authorizationForm.get('country').setValue(s.country);
      // this.authorizationForm.get('address').setValue(s.addressTypeList1);
      // this.authorizationForm.get('dob').setValue(s.dob1);
      // this.authorizationForm.get('gender').setValue(s.genderName);
      // this.authorizationForm.get('relation').setValue(s1.relationname);
      // //    this.guarantorForm.get('phoneTypeList').setValue(s.numberName);
      // //    this.get2('', true)

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
