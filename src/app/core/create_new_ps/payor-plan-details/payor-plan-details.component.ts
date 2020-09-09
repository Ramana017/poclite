import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ZipcodeService } from '../../../services/zipcode.service';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

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
  payorName;
  guardata;
  psId;
  AdmissionId;
  countyId2
  officeId;
  genderList;
  public savePayorRes;
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
  constructor(private fb: FormBuilder,  private router: Router,public service: ZipcodeService, public date: DatePipe) { }
  ngOnInit() {

    console.log(this.pvtDuty)
    this.payorPlanForm = this.fb.group({

      genderId: ['', Validators.required],
      policyNumber: ['',Validators.required],
      payorCode: ['',Validators.required],
      plancode1: ['',Validators.required],
      payorPlan: ['',Validators.required],
      rank: ['',Validators.required],
      effectiveFrom: ['',Validators.required],
      effectiveto: [''],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      relationshipList: ['',Validators.required],
      gender: ['',Validators.required],
      ssn: [''],
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
    this.psGuarData();
    this.getPayorPlanData();
    this.basicDetails();
  }
  get f() {
    return this.payorPlanForm.controls;

  }
  public pvtDuty(event) {
    console.log(event.target.checked)
    this.pvtDutyFlag = event.target.checked


  }


  psGuarData() {
    const AdmissionDetails = JSON.parse(sessionStorage.getItem('AdmissionDetails'));
    const previousPsDetails = JSON.parse(sessionStorage.getItem('psDetails'));
    const guarantorDetails = JSON.parse(sessionStorage.getItem('guarantorDetails'));
    const officeId2 = JSON.parse(sessionStorage.getItem('officeId'));
    this.officeId = officeId2
    console.log(this.officeId)

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
  public getPayorPlanData(): void {
    const params = { "officeId": this.officeId, "privateDuty": this.pvtDutyFlag ? 1 : 0 };
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
      this.genderList = this.lookupDetails.genderList;
      console.log(this.genderList)
      //  this.genderId = this.lookupDetails.genderId
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
  planname
  public getPayorCodes(event) {
    console.log(event)
    this.planname =event.planname
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
  genderName
  get1(event) {
    if (event.target.checked) {
      this.checked1 = true;
      if (this.psId.genderId === 3) {
        this.genderName = 'FEMALE';
      } else if (this.psId.genderId === 4) {
        this.genderName = 'MALE';
      }
      else if (this.psId.genderId === 5) {
        this.genderName = 'UNKNOWN';
      }
      try {

        this.payorPlanForm.get('relationshipList').setValue(this.guardata.relationship);
        this.payorPlanForm.get('firstName').setValue(this.psdata.firstname);
        this.payorPlanForm.get('lastName').setValue(this.psdata.lastname);
        this.payorPlanForm.get('dob').setValue(this.psdata.dob);
        this.payorPlanForm.get('genderId').setValue(this.psdata.gender);
        this.gender = this.psdata.genderId
        this.payorPlanForm.get('city').setValue(this.psdata.county);
        this.payorPlanForm.get('country').setValue(this.psdata.country);
        this.payorPlanForm.get('county').setValue(this.psdata.county);
        this.countyId2 = this.psdata.countyId
        this.payorPlanForm.get('timeZone').setValue(this.psdata.timezone);
        this.timeId = this.psdata.TIMEZONEID
        this.payorPlanForm.get('state').setValue(this.psdata.state);
        this.stateId = this.psdata.stateId
        this.payorPlanForm.get('phoneTypeList').setValue(this.psdata.PHONETYPE);
        this.phone = this.psdata.PHONETYPE
        this.locationName = this.psdata.locationId
        this.payorPlanForm.get('relation').setValue(this.guardata.relationship);
        this.relation = this.guardata.relationshipId
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
    }
  }
  onSubmit() {
    if (this.payorPlanForm.valid) {
      let params1={
        "psAdmissionId":this.AdmissionId,
        "payorPlanId":this.planId,
      "planname":this.planname,
      "payorcode":this.payorcode,
      "plancode":this.plancode,
      "privateDuty":this.pvtDutyFlag,
      "policyNumber":this.payorPlanForm.value.policyNumber,
      "rank":+this.payorPlanForm.value.rank,
      "effectiveFrom":this.date.transform(this.payorPlanForm.value.effectiveFrom, 'MM/dd/yyyy'),
      "effectiveTo":this.date.transform(this.payorPlanForm.value.effectiveto, 'MM/dd/yyyy'),
      "psId":this.psId,
      "relationshipId":this.relation,
      "firstName":this.payorPlanForm.value.firstName,
      "lastName":this.payorPlanForm.value.lastName,
      "middleName":"",
      "gender":this.gender,
      "dob":this.date.transform(this.payorPlanForm.value.dob, 'MM/dd/yyyy'),
      "ssn":this.payorPlanForm.value.ssn,
      "addressId":0,
      "locationName":this.locationName,
      "street":this.payorPlanForm.value.lane,
      "city":this.payorPlanForm.value.city,
      "countyId":this.countyId2,
      "timeZoneId":this.timeId,
      "stateId":this.stateId,
      "zipCode":+this.payorPlanForm.value.zipcode,
      "country":this.payorPlanForm.value.country,
      "phoneType1":this.phone,
      "phone1":this.payorPlanForm.value.number,
      "userId":1164
    }
      console.log(params1)
      try {
        this.service.savePSAdmissionPayorPlan(JSON.stringify(params1)).subscribe(d => {

          console.log(d)
          this.savePayorRes =d
          sessionStorage.setItem('savePayorRes', JSON.stringify(this.savePayorRes));
          this.router.navigateByUrl('registration-re/child-authorization');
        });
      } catch (error) {
        console.log(error);
      }
    }
    else {
      swal.fire({
        title: 'Invalid Form',
        text: 'Fill the all Required fields',
        icon: 'error',
        confirmButtonText: 'Ok',
        allowOutsideClick: false
      })
    }




  }
}
