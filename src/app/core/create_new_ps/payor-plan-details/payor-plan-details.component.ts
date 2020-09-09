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
  payor = 'planname';
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
      phId: [''],
      effectiveFrom: [''],
      effectiveto: [''],
      phone: [''],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      relationshipList: [''],
      relation: [''],
      gender: [''],
      ssn: [''],
      addressTypeId: [''],
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

    console.log(this.payorPlanForm.value);
    this.user = JSON.parse(localStorage.getItem('regis'));

    // this.service.savePs(JSON.stringify(jsonObj)).subscribe(res => {
    //   console.log(res, 'getting the saved ps details')
    // })
  }
  payorName;
  public getPayorPlanData(): void {
    const params = { "officeId": 191, "privateDuty": 0 };
    this.service.getPayorPlanList(JSON.stringify(params)).subscribe(
      data => {
        this.payorData = data;
        console.log(data);

       
      });
  }
  basicDetails() {
    const jsonObj = { 'userId': '47' };
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
    if (field === 'phId') {
      this.payorPlanForm.get('phId').setValue(event.id),
        this.siteId = event.id;
      // console.log(this.siteId);
    }

    if (field === 'relation') {
      this.payorPlanForm.get('relation').setValue(event.id);
    }

    if (field === 'addressTypeId') {
      this.payorPlanForm.get('addressTypeId').setValue(event.id);
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
  public payorcode;
  public plancode;
  public effectiveTo;
  public effectiveFrom;
  public getPayorCodes(event){
    console.log(event)
    this.payorcode= event.payorcode;
    this.plancode = event.plancode;
    this.effectiveTo = event.effectiveto;
    this.effectiveFrom = event.effectivefrom;
  }
  getzip(event) {
    const zip = this.payorPlanForm.get('zipcode').value;
    console.log(zip);
    if (zip.length === 5) {
      this.service.getZipcodeDetails(zip).subscribe(data => {
        this.zipDetails = data;
        console.log(this.zipDetails);
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
      try {
        this.previousPsDetails = JSON.parse(sessionStorage.getItem('psDetails'));
        const guarantorDetails = JSON.parse(sessionStorage.getItem('guarantorDetails'));
        const guarantorId = guarantorDetails.psGuarId;
        const parameters1 = { 'guarantorId': guarantorId };
        const parameters = { 'psId': this.previousPsDetails.psId };
        this.service.getGuarantorDetails(JSON.stringify(parameters1)).subscribe(d => {
          const res1 = d;
          this.payorPlanForm.get('relationshipList').setValue(res1.relationship);
        });
        this.service.getPsDetails(JSON.stringify(parameters)).subscribe(res => {
          const s = res;
          this.payorPlanForm.get('firstName').setValue(s.firstname);
          this.payorPlanForm.get('lastName').setValue(s.lastname);
          this.payorPlanForm.get('dob').setValue(s.dob);
          this.payorPlanForm.get('gender').setValue(s.gender);
          this.payorPlanForm.get('city').setValue(s.county);
          this.payorPlanForm.get('country').setValue(s.country);
          this.payorPlanForm.get('county').setValue(s.county);
          this.payorPlanForm.get('timeZone').setValue(s.timezone);
          this.payorPlanForm.get('state').setValue(s.state);
          this.payorPlanForm.get('phoneTypeList').setValue(s.PHONETYPE);
          this.payorPlanForm.get('number').setValue(s.PHONE);
          this.payorPlanForm.get('zipcode').setValue(s.ZIPCODE);
          this.payorPlanForm.get('addressTypeList').setValue(s.locationName);
          this.payorPlanForm.get('lane').setValue(s.street);
        });
      } catch (error) {
        console.log(error);
      }


    } else {
      this.checked = false;
      this.payorPlanForm.get('addressTypeList').setValue('');
      this.payorPlanForm.get('phoneTypeList').setValue('');
      this.payorPlanForm.get('number').setValue('');
      this.payorPlanForm.get('zipcode').setValue('');
      this.payorPlanForm.get('lane').setValue('');
      this.payorPlanForm.get('lastName').setValue('');
      this.payorPlanForm.get('firstName').setValue('');
      this.payorPlanForm.get('city').setValue('');
      this.payorPlanForm.get('phone').setValue('');
      this.payorPlanForm.get('county').setValue('');
      this.payorPlanForm.get('state').setValue('');
      this.payorPlanForm.get('timeZone').setValue('');
      this.payorPlanForm.get('country').setValue('');
      this.payorPlanForm.get('address').setValue('');
      this.payorPlanForm.get('dob').setValue('');
      this.payorPlanForm.get('gender').setValue('');
      this.payorPlanForm.get('relationshipList').setValue('');

      // this.relationAuto.clear();
      // this.relationAuto.close();
      // this.ocuupationAuto.clear();
      // this.ocuupationAuto.close();
      // this.get2('', false)
    }
  }
}
