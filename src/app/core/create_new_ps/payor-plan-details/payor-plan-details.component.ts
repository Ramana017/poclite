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
  pvtCheck;
  public psdata;
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
  public selflag: boolean = false;
  public pvtDutyFlag: boolean = false;
  public payorcode;
  public plancode;
  public effectiveTo;
  public effectiveFrom;
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
    this.psGuarData();
    console.log(this.pvtDutyFlag)
    this.payorPlanForm = this.fb.group({

      genderId: ['', Validators.required],
      policyNumber: [''],
      payorCode: [''],
      plancode1: [''],
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
  public pvtDuty(event) {
    console.log(event.target.checked)
    this.pvtDutyFlag = event.target.checked


  }

  payorName;
  public getPayorPlanData(): void {
    const params = { "officeId": 191, "privateDuty": this.pvtDutyFlag ? 1 : 0 };
    this.service.getPayorPlanList(JSON.stringify(params)).subscribe(
      data => {
        this.payorData = data;
        console.log(data);
      });
  }
  guardata;
  psId;
  AdmissionId;
  countyId2
  psGuarData() {
    const AdmissionDetails = JSON.parse(sessionStorage.getItem('AdmissionDetails'));
    const previousPsDetails = JSON.parse(sessionStorage.getItem('psDetails'));
    const guarantorDetails = JSON.parse(sessionStorage.getItem('guarantorDetails'));
    const guarantorId = guarantorDetails.psGuarId;
    const parameters1 = { 'guarantorId': guarantorId };
    const parameters = { 'psId': previousPsDetails.psId };
    this.psId = previousPsDetails.psId
    this.AdmissionId = AdmissionDetails.psAdmissionId
    this.service.getGuarantorDetails(JSON.stringify(parameters1)).subscribe(d => {
      this.guardata = d
      console.log(this.guardata)
    });
    this.service.getPsDetails(JSON.stringify(parameters)).subscribe(res => {
      this.psdata = res;
      console.log(res)
    })
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

  relation;
  gender;
  planId;
  selectChange(event, field) {

    if (field === 'genderId') {
      this.gender = event.id;
    }
    if (field === 'relation') {
      this.relation = event.id;
    }
    if (field === 'addressTypeId') {
      this.locationName = event.id;
    }
    if (field === 'phoneTypeList') {
      this.phone = event.label;
      console.log(this.phone)
    }
    if (field === 'payorPlan') {
      this.planId = event.payorPlanId;
      console.log(this.planId)
    }
  }

  public getPayorCodes(event) {
    console.log(event)
    this.payorcode = event.payorcode;
    this.plancode = event.plancode;

  }
  timeId;
  stateId;
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
        this.stateId = this.zipDetails.stateId;
        this.timeZone = this.zipDetails.timeZone;
        this.timeId = this.zipDetails.timeZoneId
        this.county = this.zipDetails.county;
        this.countyId2 = this.zipDetails.countyId
      });
    }
  }

  get1(event) {
    if (event.target.checked) {
      this.checked1 = true;
      this.selflag = true;
      console.log(this.selflag)
      try {

        this.payorPlanForm.get('relationshipList').setValue(this.guardata.relationship);
        this.payorPlanForm.get('firstName').setValue(this.psdata.firstname);
        this.payorPlanForm.get('lastName').setValue(this.psdata.lastname);
        this.payorPlanForm.get('dob').setValue(this.psdata.dob);
        this.payorPlanForm.get('gender').setValue(this.psdata.gender);
        this.payorPlanForm.get('city').setValue(this.psdata.county);
        this.payorPlanForm.get('country').setValue(this.psdata.country);
        this.payorPlanForm.get('county').setValue(this.psdata.county);
        this.countyId2 =this.psdata.countyId
        this.payorPlanForm.get('timeZone').setValue(this.psdata.timezone);
        this.timeId =this.psdata.TIMEZONEID
        this.payorPlanForm.get('state').setValue(this.psdata.state);
        this.stateId =this.psdata.stateId
        this.payorPlanForm.get('phoneTypeList').setValue(this.psdata.PHONETYPE);
         this.phone = this.psdata.PHONETYPE
        this.gender = this.psdata.genderId
        this.locationName = this.psdata.locationId
        this.payorPlanForm.get('relation').setValue(this.guardata.relationship);
         this.relation=this.guardata.relationshipId
        this.payorPlanForm.get('number').setValue(this.psdata.PHONE);
        this.payorPlanForm.get('zipcode').setValue(this.psdata.ZIPCODE);
        this.payorPlanForm.get('addressTypeList').setValue(this.psdata.locationName);
        this.payorPlanForm.get('lane').setValue(this.psdata.street);

      } catch (error) {
        console.log(error);
      }


    } else {
      this.checked1 = false;
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
  onSubmit() {
    console.log(this.payorPlanForm.value, "formvalue");
    console.log(this.psdata.PHONETYPE, "psdatavalue")
    if (this.selflag === false) {
      console.log(this.phone)
    } else {
      console.log(this.psdata.PHONETYPE)
    }
    console.log(this.selflag)
    let params = {
      "psAdmissionId": this.AdmissionId,
      "payorPlanId": this.planId,
      "policyNumber": this.payorPlanForm.value.policyNumber,
      "rank": +this.payorPlanForm.value.rank,
      "effectiveFrom": this.date.transform(this.payorPlanForm.value.effectiveFrom, 'MM/dd/yyyy'),
      "effectiveTo": this.date.transform(this.payorPlanForm.value.effectiveto, 'MM/dd/yyyy'),
      "psId": this.psId,
      "relationshipId": this.relation,
       "firstName":this.payorPlanForm.value.firstName,
       "lastName":this.payorPlanForm.value.lastName,
       "middleName":"",
      "gender": this.gender,
       "dob":this.date.transform(this.payorPlanForm.value.dob, 'MM/dd/yyyy'),
       "ssn":this.payorPlanForm.value.ssn,
       "addressId":0,
      "locationName": this.locationName,
       "street":this.payorPlanForm.value.lane,
       "city":this.payorPlanForm.value.city,
       "countyId":this.countyId2,
       "timeZoneId":this.timeId ,
       "stateId":this.stateId,
       "zipCode":+this.payorPlanForm.value.zipcode,
       "country":this.payorPlanForm.value.country,
      'phoneType1': this.phone,
       "phone1":this.payorPlanForm.value.number,
       "userId":1164,
    }
    console.log(params)
    this.service.savePSAdmissionPayorPlan(JSON.stringify(params)).subscribe(d => {

      console.log(d)
    });

  }
}
