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


<<<<<<< HEAD
    title = 'Form';
    public payorPlanForm: FormGroup;
    public lookupDetails: any;
    public relationshipList;
    public addressTypeList: any;
    public payorData;
    public maritalStatusList: any;
    public phoneTypeList: any;
    public genderId1: any;
    public pvtCheck;
    public psdata;
    public checked;
    public addressid;
    public locationName1;
    public payor = 'planname';
    public Keyword = 'label';
    public city;
    public payorName;
    public guardata;
    public psId;
    public AdmissionId;
    public countyId2;
    public planname;
    public officeId;
    public genderList;
    public savePayorRes;
    public selflag: boolean = false;
    public pvtDutyFlag: boolean = false;
    public payorcode;
    public plancode;
    public effectiveTo;
    public stateId;
    public effectiveFrom;
    public zipDetails;
    public country;
    public timeId;
    public timeZone;
    public state;
    public county;
    public keyword1 = 'siteName';
    public phone;
    public submitted = false;
    public relation;
    public gender1;
    public planId;
    public previousPsDetails: any;
    constructor(private fb: FormBuilder, private router: Router, public service: ZipcodeService, public date: DatePipe) { }
    ngOnInit() {
        this.psGuarData();
        this.getPayorPlanData();
        this.basicDetails();
=======
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
genderId1: any;
pvtCheck;
public psdata;
checked;
data;
addressid;
locationName1;
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
public userId:number;
constructor(private fb: FormBuilder, private router: Router,public service: ZipcodeService, public date: DatePipe) {
  let data: any = this.userId = JSON.parse(sessionStorage.getItem("useraccount"));
  this.userId = data.userId
}
ngOnInit() {
this.psGuarData();
this.getPayorPlanData();
this.basicDetails();
>>>>>>> f3fcb619b0dc30f4b346cd7f68c22bdd943a3c7c

        this.payorPlanForm = this.fb.group({

            genderId: ['', Validators.required],
            policyNumber: ['', Validators.required],
            payorCode: ['', Validators.required],
            plancode1: ['', Validators.required],
            payorPlan: ['', Validators.required],
            rank: ['', Validators.required],
            effectiveFrom: ['', Validators.required],
            effectiveto: [''],
            lastName: ['', Validators.required],
            firstName: ['', Validators.required],
            relationshipList: ['', Validators.required],
            ssn: [''],
            number: ['', Validators.required],
            addressTypeList: ['', Validators.required],
            phoneTypeList: ['', Validators.required],
            city: ['', Validators.required],
            zipcode: ['', Validators.required],
            country: [''],
            county: ['', Validators.required],
            state: ['', Validators.required],
            timeZone: ['', Validators.required],
            lane: ['', Validators.required],
            dob: ['', Validators.required],
        });
    }
    get f() {
        return this.payorPlanForm.controls;

    }
    public pvtDuty(event) {
        console.log(event.target.checked);
        this.pvtDutyFlag = event.target.checked;


    }


    public psGuarData() {
        const AdmissionDetails = JSON.parse(sessionStorage.getItem('AdmissionDetails'));
        const previousPsDetails = JSON.parse(sessionStorage.getItem('psDetails'));
        const guarantorDetails = JSON.parse(sessionStorage.getItem('guarantorDetails'));
        const officeId2 = JSON.parse(sessionStorage.getItem('officeId'));
        this.officeId = officeId2;
        const guarantorId = guarantorDetails.psGuarId;
        const parameters1 = { 'guarantorId': guarantorId };
        const parameters = { 'psId': previousPsDetails.psId };
        this.psId = previousPsDetails.psId;
        this.AdmissionId = AdmissionDetails.psAdmissionId;
        this.service.getGuarantorDetails(JSON.stringify(parameters1)).subscribe(d => {
            this.guardata = d;
            console.log(this.guardata);
        });
        this.service.getPsDetails(JSON.stringify(parameters)).subscribe(res => {
            this.psdata = res;
            console.log(res);
        });
    }
    public getPayorPlanData(): void {
        const params = { "officeId": this.officeId, "privateDuty": this.pvtDutyFlag ? 1 : 0 };
        this.service.getPayorPlanList(JSON.stringify(params)).subscribe(
            data => {
                this.payorData = data;
                console.log(data);
            });
    }
    public basicDetails() {
        const jsonObj = { 'userId': '47' };
        this.service.getLookupDetails(JSON.stringify(jsonObj)).subscribe(data => {
            this.lookupDetails = data;
            console.log(this.lookupDetails);
            this.addressTypeList = this.lookupDetails.addressTypeList;
            this.relationshipList = this.lookupDetails.relationshipList;
            this.maritalStatusList = this.lookupDetails.maritalStatusList;
            this.phoneTypeList = this.lookupDetails.phoneTypeList;
            this.genderList = this.lookupDetails.genderList;
            console.log(this.genderList)
        });
    }


    public selectChange(event, field) {

        if (field === 'genderId') {
            this.gender1 = event.id;
        }
        if (field === 'relation') {
            this.relation = event.id;
        }
        if (field === 'addressTypeId') {
            this.locationName1 = event.id;
        }
        if (field === 'phoneTypeList') {
            this.phone = event.label;
            console.log(this.phone)
        }
    }
    public getPayorCodes(event) {
        console.log(event);
        this.planname = event.planname;
        this.planId = event.payorPlanId;

        // this.payorcode = event.payorcode;
        // this.plancode = event.plancode;
        this.payorPlanForm.get('payorCode').setValue(event.payorcode)
        this.payorPlanForm.get('plancode1').setValue(event.plancode)

    }
    
    public getzip(event) {
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
    public get1(event) {
        if (event.target.checked) {
            this.checked = true;

            try {

                this.payorPlanForm.get('relationshipList').setValue(this.guardata.relationship);
                this.payorPlanForm.get('firstName').setValue(this.psdata.firstname);
                this.payorPlanForm.get('lastName').setValue(this.psdata.lastname);
                this.payorPlanForm.get('dob').setValue(this.psdata.dob);
                this.payorPlanForm.get('genderId').setValue(this.psdata.gender);
                this.gender1 = this.psdata.genderId
                this.payorPlanForm.get('city').setValue(this.psdata.county);
                this.payorPlanForm.get('country').setValue(this.psdata.country);
                this.payorPlanForm.get('county').setValue(this.psdata.county);
                this.countyId2 = this.psdata.countyId
                this.payorPlanForm.get('timeZone').setValue(this.psdata.timezone);
                this.timeId = this.psdata.TIMEZONEID
                this.payorPlanForm.get('state').setValue(this.psdata.state);
                this.stateId = this.psdata.stateId
                this.payorPlanForm.get('phoneTypeList').setValue(this.psdata.PHONETYPE);
                this.phone = this.psdata.PHONETYPEID
                this.locationName1 = this.psdata.locationId
                this.relation = this.guardata.relationshipId
                this.payorPlanForm.get('number').setValue(this.psdata.PHONE);
                this.payorPlanForm.get('zipcode').setValue(this.psdata.ZIPCODE);
                this.payorPlanForm.get('addressTypeList').setValue(this.psdata.locationName);
                this.payorPlanForm.get('lane').setValue(this.psdata.street);

            } catch (error) {
                console.log(error);
            }

<<<<<<< HEAD
=======
} else {
this.checked = false;
this.payorPlanForm.get('relationshipList').setValue('');
this.payorPlanForm.get('addressTypeList').setValue('');
this.payorPlanForm.get('phoneTypeList').setValue('');
this.payorPlanForm.get('number').setValue('');
this.payorPlanForm.get('zipcode').setValue('');
this.payorPlanForm.get('lane').setValue('');
this.payorPlanForm.get('lastName').setValue('');
this.payorPlanForm.get('firstName').setValue('');
this.payorPlanForm.get('city').setValue('');
this.payorPlanForm.get('county').setValue('');
this.payorPlanForm.get('state').setValue('');
this.payorPlanForm.get('timeZone').setValue('');
this.payorPlanForm.get('country').setValue('');
this.payorPlanForm.get('dob').setValue('');
this.payorPlanForm.get('genderId').setValue('');
// this.relationAuto.clear();
// this.relationAuto.close();
// this.ocuupationAuto.clear();
// this.ocuupationAuto.close();
}
}
onSubmit() {
console.log(this.payorPlanForm.value)
console.log(this.payorPlanForm.valid)
if (this.payorPlanForm.valid) {
let params1={
"psAdmissionId":this.AdmissionId,
"payorPlanId":this.planId,
"planname":this.planname,
"payorcode":this.payorPlanForm.value.payorCode,
"plancode":this.payorPlanForm.value.plancode1,
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
"gender":this.gender1,
"dob":this.date.transform(this.payorPlanForm.value.dob, 'MM/dd/yyyy'),
"ssn":this.payorPlanForm.value.ssn,
"addressId":0,
"locationName":this.locationName1,
"street":this.payorPlanForm.value.lane,
"city":this.payorPlanForm.value.city,
"countyId":this.countyId2,
"timeZoneId":this.timeId,
"stateId":this.stateId,
"zipCode":+this.payorPlanForm.value.zipcode,
"country":this.payorPlanForm.value.country,
"phoneType1":this.phone,
"phone1":this.payorPlanForm.value.number,
"userId":this.userId
}
console.log(params1)
try {
this.service.savePSAdmissionPayorPlan(JSON.stringify(params1)).subscribe(d => {
>>>>>>> f3fcb619b0dc30f4b346cd7f68c22bdd943a3c7c

        } else {
            this.checked = false;
            this.payorPlanForm.get('relationshipList').setValue('');
            this.payorPlanForm.get('addressTypeList').setValue('');
            this.payorPlanForm.get('phoneTypeList').setValue('');
            this.payorPlanForm.get('number').setValue('');
            this.payorPlanForm.get('zipcode').setValue('');
            this.payorPlanForm.get('lane').setValue('');
            this.payorPlanForm.get('lastName').setValue('');
            this.payorPlanForm.get('firstName').setValue('');
            this.payorPlanForm.get('city').setValue('');
            this.payorPlanForm.get('county').setValue('');
            this.payorPlanForm.get('state').setValue('');
            this.payorPlanForm.get('timeZone').setValue('');
            this.payorPlanForm.get('country').setValue('');
            this.payorPlanForm.get('dob').setValue('');
            this.payorPlanForm.get('genderId').setValue('');
            // this.relationAuto.clear();
            // this.relationAuto.close();
            // this.ocuupationAuto.clear();
            // this.ocuupationAuto.close();
        }
    }
    public onSubmit() {
        console.log(this.payorPlanForm.value)
        console.log(this.payorPlanForm.valid)
        if (this.payorPlanForm.valid) {
            let params1 = {
                "psAdmissionId": this.AdmissionId,
                "payorPlanId": this.planId,
                "planname": this.planname,
                "payorcode": this.payorPlanForm.value.payorCode,
                "plancode": this.payorPlanForm.value.plancode1,
                "privateDuty": this.pvtDutyFlag,
                "policyNumber": this.payorPlanForm.value.policyNumber,
                "rank": +this.payorPlanForm.value.rank,
                "effectiveFrom": this.date.transform(this.payorPlanForm.value.effectiveFrom, 'MM/dd/yyyy'),
                "effectiveTo": this.date.transform(this.payorPlanForm.value.effectiveto, 'MM/dd/yyyy'),
                "psId": this.psId,
                "relationshipId": this.relation,
                "firstName": this.payorPlanForm.value.firstName,
                "lastName": this.payorPlanForm.value.lastName,
                "middleName": "",
                "gender": this.gender1,
                "dob": this.date.transform(this.payorPlanForm.value.dob, 'MM/dd/yyyy'),
                "ssn": this.payorPlanForm.value.ssn,
                "addressId": 0,
                "locationName": this.locationName1,
                "street": this.payorPlanForm.value.lane,
                "city": this.payorPlanForm.value.city,
                "countyId": this.countyId2,
                "timeZoneId": this.timeId,
                "stateId": this.stateId,
                "zipCode": +this.payorPlanForm.value.zipcode,
                "country": this.payorPlanForm.value.country,
                "phoneType1": this.phone,
                "phone1": this.payorPlanForm.value.number,
                "userId": 1164
            };
            console.log(params1);
            try {
                this.service.savePSAdmissionPayorPlan(JSON.stringify(params1)).subscribe(d => {
                    console.log(d);
                    this.savePayorRes = d
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
            });
        }




    }
}
