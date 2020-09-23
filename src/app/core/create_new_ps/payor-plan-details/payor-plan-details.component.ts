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

  public payorPlanForm: FormGroup;
  public lookupDetails: any;
  public relationshipList;
  public addressTypeList: any;
  public payorData: any;
  public phoneTypeList: any;
  public psdata;
  public payor = 'planname';
  public Keyword = 'name';
  public guardata;
  public psId;
  public AdmissionId;
  public officeId;
  public genderList: any;
  public savePayorRes;
  public selflag: boolean = false;
  public pvtDutyFlag: boolean = false;
  public payorcode;
  public plancode;
  public effectiveTo;
  public effectiveFrom;
  public zipDetails: any;
  private countryId: any;
  private stateId: any;
  private countyId: any;
  private timeZoneId: any;
  public formError: boolean = false;
  public userId: number;
  public currentDate: Date = new Date();
  public phoneNumber;
  public addressId=0;
  private admitDate;
  private clientTypeId;
  private clientClassId;
  constructor(private fb: FormBuilder, private router: Router, public service: ZipcodeService, public date: DatePipe) {
    let data: any = this.userId = JSON.parse(sessionStorage.getItem("useraccount"));
    this.userId = data.userId
  }
  ngOnInit() {
    this.psGuarData();
    this.getPayorPlanData();
    this.basicDetails();

    this.payorPlanForm = this.fb.group({
      payorPlan: ['', Validators.required],
      payorPlanId: ['', Validators.required],
      payorCode: ['', Validators.required],
      plancode: ['', Validators.required],
      rank: ['', Validators.required],
      effectiveFrom: ['', Validators.required],
      effectiveto: [''],
      relationshipList: ['', Validators.required],
      relationshipListId: ['', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      genderId: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      ssn: [''],
      policyNumber: [''],
      addressTypeList: ['', Validators.required],
      addressTypeListId: ['', Validators.required],
      lane: ['', Validators.required],
      lane1: ['',],
      zipcode: ['', Validators.required],
      phoneTypeList: ['', Validators.required],
      phoneTypeListId: ['', Validators.required],
      number: ['', Validators.required],
      city: ['', Validators.required],
      country: [''],
      county: ['', Validators.required],
      state: ['', Validators.required],
      timeZone: ['', Validators.required],

    });
  }
  get f() {
    return this.payorPlanForm.controls;

  }
  public pvtDuty(event) {
    console.log(event.target.checked)


    this.pvtDutyFlag = event.target.checked;
    this.pvtDutyFlag?this.payorPlanForm.controls['policyNumber'].disable():this.payorPlanForm.controls['policyNumber'].enable();
    this.payorPlanForm.get('payorPlanId').setValue('');
    this.payorPlanForm.get('payorPlan').setValue('');
    this.payorPlanForm.get('payorCode').setValue('');
    this.payorPlanForm.get('plancode').setValue('');
    this.payorPlanForm.get('policyNumber').setValue('')
    this.getPayorPlanData();


  }


  public psGuarData() {
    const AdmissionDetails = JSON.parse(sessionStorage.getItem('AdmissionDetails'));
    const previousPsDetails = JSON.parse(sessionStorage.getItem('psDetails'));
    const officeId2 = JSON.parse(sessionStorage.getItem('officeId'));
    this.officeId = officeId2;
    console.log(this.officeId);
    const parameters = { 'psId': previousPsDetails.psId };
    this.psId = previousPsDetails.psId
    this.AdmissionId = AdmissionDetails.psAdmissionId;
    this.clientClassId=AdmissionDetails.clientClassId;
    this.clientTypeId=AdmissionDetails.clientTypeId;
    this.admitDate=AdmissionDetails.admitDate;
    this.service.getPsDetails(JSON.stringify(parameters)).subscribe(res => {
      this.psdata = res;
      console.log(res)
      console.log(this.psdata)
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
  public basicDetails() {
    this.service.getLookupsDataGurantor().subscribe(data => {
      this.lookupDetails = data;
      console.log(this.lookupDetails);
      // this.saluationList = this.lookupDetails.salutationList;
      this.addressTypeList = this.lookupDetails.addressType;
      this.relationshipList = this.lookupDetails.relationship;
      this.phoneTypeList = this.lookupDetails.phoneType;
      this.genderList = this.lookupDetails.gender;
      console.log(this.genderList)
    });
  }

  public selectChange(event, field, flag) {

    if (field === 'genderId') {
      this.payorPlanForm.get('genderId').setValue(flag ? event.id : '')
    }
    if (field === 'relation') {
      this.payorPlanForm.get('relationshipListId').setValue(flag ? event.id : '');
      flag&&event.id=='100'?this.get1(null,true):'';
    }
    if (field === 'addressTypeId') {
      this.payorPlanForm.get('addressTypeListId').setValue(flag ? event.id : '')
    }
    if (field === 'phoneTypeList') {
      this.payorPlanForm.get('phoneTypeListId').setValue(flag ? event.id : '')
    }

  }
  public getPayorCodes(event, flag) {
    this.payorPlanForm.get('payorPlanId').setValue(flag ? event.payorPlanId : '');
    this.payorPlanForm.get('payorCode').setValue(flag ? event.payorcode : '')
    this.payorPlanForm.get('plancode').setValue(flag ? event.plancode : '')
  }
  public getzip(): void {
    const zip = this.payorPlanForm.get('zipcode').value;
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
          this.payorPlanForm.get('city').setValue(this.zipDetails.city);
          this.payorPlanForm.get('country').setValue(this.zipDetails.country);
          this.payorPlanForm.get('county').setValue(this.zipDetails.county);
          this.payorPlanForm.get('timeZone').setValue(this.zipDetails.timeZone);
          this.payorPlanForm.get('state').setValue(this.zipDetails.state);
        }

        else {
          swal.fire({
            title: 'Invalid pincode',
            text: 'Invalid ZIP code. Please enter a valid ZIP code.',
            icon: 'warning',
            confirmButtonText: 'Ok',
            allowOutsideClick: false
          })
          this.payorPlanForm.get('city').setValue('');
          this.payorPlanForm.get('country').setValue('');
          this.payorPlanForm.get('county').setValue('');
          this.payorPlanForm.get('timeZone').setValue('');
          this.payorPlanForm.get('state').setValue('');
          this.payorPlanForm.get('zipcode').setValue('');
          this.stateId = ''
          this.countyId = ''
          this.timeZoneId = ''
          this.countryId = ''
        }

      });
    }
  }
  public get1(event,falg?) {
    // console.log(event.target.checked)
    let Flag = event !=null?event.target.checked:falg;
    this.payorPlanForm.get('relationshipListId').setValue(Flag ? '100' : '');
    this.payorPlanForm.get('relationshipList').setValue(Flag ? "SELF" : '');
    this.payorPlanForm.get('firstName').setValue(Flag ? this.psdata.firstname : '');
    this.payorPlanForm.get('lastName').setValue(Flag ? this.psdata.lastname : '');
    this.payorPlanForm.get('gender').setValue(Flag ? this.psdata.gender : '');
    this.payorPlanForm.get('genderId').setValue(Flag ? this.psdata.genderId : '');
    this.payorPlanForm.get('dob').setValue(Flag ? this.psdata.dob : '');
    this.payorPlanForm.get('addressTypeListId').setValue(Flag ? this.psdata.locationId : '');
    this.payorPlanForm.get('addressTypeList').setValue(Flag ? this.psdata.locationName : '');
    this.payorPlanForm.get('lane').setValue(Flag ? this.psdata.street : '');
    this.payorPlanForm.get('lane1').setValue(Flag ? this.psdata.addressLine2: '');
    this.payorPlanForm.get('zipcode').setValue(Flag ? this.psdata.ZIPCODE : '');
    this.payorPlanForm.get('phoneTypeList').setValue(Flag ? this.psdata.PHONETYPE : '');
    this.payorPlanForm.get('phoneTypeListId').setValue(Flag ? this.psdata.PHONETYPEID : '');
    // this.payorPlanForm.get('number').setValue(Flag ? this.psdata.PHONE : '');
    this.PhoneNumFormat(null,'phone',this.psdata.PHONE );
    this.payorPlanForm.get('timeZone').setValue(Flag ? this.psdata.timezone : '');
    this.payorPlanForm.get('city').setValue(Flag ? this.psdata.city : '');
    this.payorPlanForm.get('country').setValue(Flag ? this.psdata.country : '');
    this.payorPlanForm.get('county').setValue(Flag ? this.psdata.county : '');
    this.payorPlanForm.get('state').setValue(Flag ? this.psdata.state : '');
    // this.payorPlanForm.get('ssn').setValue(Flag ? this.psdata.ssn : '');
    this.PhoneNumFormat(null,'ssn',this.psdata.ssn );
    this.timeZoneId = Flag ? this.psdata.TIMEZONEID : '';
    this.stateId = Flag ? this.psdata.stateId : '';
    this.countyId = Flag ? this.psdata.countyId : '';
    this.countryId = Flag ? this.psdata.countryId : '';
    this.addressId=Flag?this.psdata.addressId:0;
  }
  public onSubmit() {
    this.formError = true;
    this.payorPlanForm.get('dob').value > this.currentDate ? this.payorPlanForm.get('dob').setValue(this.currentDate) : '';
    this.phoneNumber = this.payorPlanForm.value.number;
    let ssnLength =this.payorPlanForm.value.ssn!=undefined? this.payorPlanForm.value.ssn.length:0;
    let policyNumberLength = this.payorPlanForm.value.policyNumber!=undefined?this.payorPlanForm.value.policyNumber.length:0;
    console.log(this.payorPlanForm.value,policyNumberLength)
    console.log(this.payorPlanForm.valid)
    if (this.payorPlanForm.valid) {

      if (this.phoneNumber.length == 12) {
        var phone1areacode = this.phoneNumber.slice(0, 3);
        var phone1exchangecode = this.phoneNumber.slice(4, 7)
        if (phone1areacode >= 199 && phone1exchangecode >= 199) {
          console.log("phone number is correct");
          // ssnLength == 0 ? this.payorPlanSave() : this.checkSSn();
          if(ssnLength==0&&policyNumberLength==0){
           this.payorPlanSave();
          }
          else{
            policyNumberLength>0 ? this.isPolicyNumRequired(ssnLength,policyNumberLength):this.checkSSn();
          }
        }
        else {
          if (phone1areacode <= 1 || phone1areacode <= 199) {
            console.log("area code missing")
            this.alertbox("Area Code (first 3 digits) should not be in between 001 and 199 for Phone  or Phone 3")
          }
          if (phone1exchangecode <= 1 || phone1exchangecode <= 199) {
            console.log("area exchange code missing")

            this.alertbox("Exchange (middle 3 digits)  should not be in between 001 and 199 for Phone  or Phone 3")
          }
        }
      }
      else {
        this.alertbox(" Phone number should be 10 digits ")

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

  private payorPlanSave() {
    let params1 = {
      "psAdmissionId": this.AdmissionId,
      "payorPlanId": this.payorPlanForm.value.payorPlanId,
      "psId": this.psId,
      "policyNumber": this.payorPlanForm.value.policyNumber!=undefined?this.payorPlanForm.value.policyNumber:'',
      "rank": +this.payorPlanForm.value.rank,
      "effectiveFrom": this.date.transform(this.payorPlanForm.value.effectiveFrom, 'MM/dd/yyyy'),
      "effectiveTo": this.payorPlanForm.value.effectiveto == '' || null ? '' : this.date.transform(this.payorPlanForm.value.effectiveto, 'MM/dd/yyyy'),
      "relationshipId": this.payorPlanForm.value.relationshipListId,
      "firstName": this.payorPlanForm.value.firstName,
      "lastName": this.payorPlanForm.value.lastName,
      "middleName": "",
      "gender": this.payorPlanForm.value.genderId,
      "dob": this.date.transform(this.payorPlanForm.value.dob, 'MM/dd/yyyy'),
      "ssn": this.payorPlanForm.value.ssn!=undefined?this.payorPlanForm.value.ssn.replace(/-/g, ''):'',
      "addressId": this.addressId,
      "locationName": this.payorPlanForm.value.addressTypeListId,
      "street": this.payorPlanForm.value.lane,
      "addressLine2": this.payorPlanForm.value.lane1,
      "city": this.payorPlanForm.value.city,
      "countyId": this.countyId,
      "timeZoneId": this.timeZoneId,
      "stateId": this.stateId,
      "zipCode": this.payorPlanForm.value.zipcode,
      "country": this.payorPlanForm.value.country,
      "countryId":this.countryId,
      "phoneType1": this.payorPlanForm.value.phoneTypeListId,
      "phone1": this.payorPlanForm.value.number.replace(/-/g, ''),
      "userId": this.userId,
      "planname":this.payorPlanForm.value.payorPlan.planname,
      "payorcode":this.payorPlanForm.value.payorCode,
      "plancode":this.payorPlanForm.value.plancode,
      "privateDuty": this.pvtDutyFlag,
    }
    console.log(params1)
    try {
      this.service.savePSAdmissionPayorPlan(JSON.stringify(params1)).subscribe(d => {

        console.log(d)
        this.savePayorRes = d
        sessionStorage.setItem('savePayorRes', JSON.stringify(this.savePayorRes));
        this.service.showSuccess('PayorPlan created Succssfully!');
        this.router.navigateByUrl('registration-re/child-authorization');
      });
    } catch (error) {
      console.log(error);
    }

  }
  private alertbox(string) {
    var message = 'Invalid Number'
    swal.fire(message, string, 'warning')
  }
  private checkSSn() {
    try {
      let params = { 'ssn': this.payorPlanForm.value.ssn.replace(/-/g, '') ,"screenFlag":"subscriber"}
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
          this.payorPlanSave()
        }
      })
    } catch (error) {

    }
  }
  // public PhoneNumFormat(event, flag) {
  //   // console.log("++++++++++", event.target.value)
  //   var input2 = event.target.value.replace(/\D/g, '');
  //   flag == "ssn" ? this.payorPlanForm.get('ssn').setValue(input2) : this.payorPlanForm.get('number').setValue(input2);
  // }
  public PhoneNumFormat(event, flag,value?) {

    var input =event!=null? event.target.value:value;
    if (input != undefined) {
      let trimmed = input.replace(/\D/g, '');
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

      if (flag == 'phone') {
        this.payorPlanForm.get('number').setValue( numbers.join('-'));
      }else if(flag=="ssn"){
        this.payorPlanForm.get('ssn').setValue( numbers.join('-'));
      }

    }
  }
  private isPolicyNumRequired(ssnLength,policyNumberLength){
  let params = {"payorCode":this.payorPlanForm.value.payorCode,"planCode":this.payorPlanForm.value.plancode,"admitDate":this.admitDate,"clientTypeId":this.clientTypeId,"clientClassId":this.clientClassId};
  try {
    this.service.isPolicyNumRequired(JSON.stringify(params)).subscribe(
      response=>{
        console.log(response);
        let resData:any=response;
        if(resData.isPolicyNumRequired==0){
          ssnLength>0?this.checkSSn():this.payorPlanSave();
        }else{
          //save function
          swal.fire({
            title: 'Invalid Policy Number',
            text: "Please Enter the PolicyNumber",
            icon: 'error',
            confirmButtonText: 'Ok',
            allowOutsideClick: false
          })
        }
      }
    )

  } catch (error) {

  }

  }
}

