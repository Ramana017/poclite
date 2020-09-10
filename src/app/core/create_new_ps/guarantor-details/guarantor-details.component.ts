import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ZipcodeService } from '../../../services/zipcode.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-guarantor-details',
  templateUrl: './guarantor-details.component.html',
  styleUrls: ['./guarantor-details.component.scss']
})
export class GuarantorDetailsComponent implements OnInit {
  public selfChecBox: boolean = false;
  public addressCheckBox: boolean = false;
  public guarantorId: number = 0;
  public basicPreviousData: any;
  public guarantorForm: FormGroup;
  public zipDetails: any;
  public occupationList = [];
  public relationshipList = [];
  public relationId;
  public addressTypeList: any;
  public phoneTypeList: any;
  public Keyword = 'label';
  public relationName;
  public lookupDetails: any;
  public submitted: boolean = false;
  public previousPsDetails: any;
  public guarantorResponse: Object;
  public checkBoxAddress: boolean = false;
  public userId: number;
  constructor(private fb: FormBuilder, public service: ZipcodeService, private router: Router) {
    let data: any = this.userId = JSON.parse(sessionStorage.getItem("useraccount"));
    this.userId = data.userId
    // let session = sessionStorage.getItem('guarantorDetails');
    // if (session) {
    //   console.log('guranter present')
    //   this.getGuarantorDetails();
    // }

  }
  ngOnInit() {
    console.log("guarantor")
    this.newForm();
    this.basicDetails();
    this.getPsDetails();
  }
  private newForm(): void {
    this.guarantorForm = this.fb.group({
      saluationId: ['', Validators.required],
      relationshipList: ['', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      ssn: [''],
      number: ['', Validators.required],
      occupationList: ['28', Validators.required],
      addressTypeList: ['', Validators.required],
      phoneTypeList: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
      country: ['', Validators.required],
      county: ['', Validators.required],
      state: ['', Validators.required],
      timeZone: ['', Validators.required],
      lane: ['', Validators.required],
      location: [''],
      phoneTypeName: [''],
      occupationName: ['UNKNOWN'],
      relationId: [''],
    });

  }

  get f() {

    return this.guarantorForm.controls;

  }

  public onSubmit(): void {
    this.submitted = true;
    console.log(this.guarantorForm.value)
    if (this.guarantorForm.valid) {
      const jsonObj = {
        "saluationId": (this.guarantorForm.value.saluationId),
        "lastName": this.guarantorForm.value.lastName,
        "firstName": this.guarantorForm.value.firstName,
        "iRelationShipId": (this.guarantorForm.value.relationshipList),
        "locationId": (this.guarantorForm.value.addressTypeList),
        "city": this.guarantorForm.value.city,
        "addressLine": this.guarantorForm.value.lane,
        "zipcode": this.guarantorForm.value.zipcode,
        "phoneTypeid": (this.guarantorForm.value.phoneTypeList),
        "phone": this.guarantorForm.value.number,
        "updatedUserId": this.userId,
        "psId": this.previousPsDetails.psId,
        "occupationId": this.guarantorForm.value.occupationList,
        "guarantorId": this.guarantorId
      }
      let param = JSON.stringify(jsonObj);
      try {
        console.log(param)
        this.service.saveGuarantor(param).subscribe(res => {
          this.guarantorResponse = res;
          console.log(this.guarantorResponse)
          if (Object.keys(this.guarantorResponse).length !== 0) {
            sessionStorage.setItem('guarantorDetails', JSON.stringify(this.guarantorResponse));
            this.router.navigateByUrl('registration-re/child-admission')
          }
        });
      } catch (error) {
        console.log(error)
      }

    } else {
      // alert("Fill all the required fields")
      swal.fire({
        title: 'Invalid Form',
        text: 'Fill the all Required fields',
        icon: 'error',
        confirmButtonText: 'Ok',
        allowOutsideClick: false
      })

    }

  }

  public basicDetails(): void {
    let jsonObj = { 'userId': this.userId };

    this.service.getLookupDetails(JSON.stringify(jsonObj)).subscribe(data => {
      console.log(data)
      this.lookupDetails = data;
      this.addressTypeList = this.lookupDetails.addressTypeList;
      this.phoneTypeList = this.lookupDetails.phoneTypeList;
      this.relationshipList = this.lookupDetails.relationshipList;
      this.occupationList = this.lookupDetails.occupationList;

    });
  }
  public selectChange(event, field): void {
    if (field === 'addressTypeList') {
      this.guarantorForm.get('addressTypeList').setValue(event.id);
    }
    if (field === 'phoneTypeList') {
      this.guarantorForm.get('phoneTypeList').setValue(event.id);
    }
    if (field === 'relationshipList') {
      this.guarantorForm.get('relationshipList').setValue(event.id);
      if(event.id==100){
        // this.selfChecBox=true;
        this.SelfCheck(null,true);
      }
        this.relationName = event.label;
        this.relationId = event.id;
    }
    if (field === 'occupationList') {
      this.guarantorForm.get('occupationList').setValue(event.id);
    }
    if (field === 'phoneTypeList') {
      this.guarantorForm.get('phoneTypeList').setValue(event.id);
    }
  }

  public getzip(): void {
    const zip = this.guarantorForm.get('zipcode').value;
    // console.log(zip)
    if (zip.length === 5) {
      this.service.getZipcodeDetails(zip).subscribe(data => {
        this.zipDetails = data;
        console.log(this.zipDetails)
        this.guarantorForm.get('city').setValue(this.zipDetails.city)
        this.guarantorForm.get('country').setValue(this.zipDetails.country)
        this.guarantorForm.get('county').setValue(this.zipDetails.county)
        this.guarantorForm.get('timeZone').setValue(this.zipDetails.timeZone)
        this.guarantorForm.get('state').setValue(this.zipDetails.state)

      });
    }
  }


  private getPsDetails(): void {
    try {
      this.previousPsDetails = JSON.parse(sessionStorage.getItem('psDetails'));
      let parameters = { 'psId': this.previousPsDetails.psId }
      this.service.getPsDetails(JSON.stringify(parameters)).subscribe(res => {
        console.log(res)
        this.basicPreviousData = res;
        this.guarantorForm.get('saluationId').setValue(this.basicPreviousData.SALUTATIONId);
      })
    } catch (error) {
      console.log(error)
    }
  }
  public addressCheck(event?,dropdown?:boolean): void {

    console.log(event)
    let flag = event!=null? event.target.checked:dropdown

    console.log("addressCheck")
    this.guarantorForm.get('addressTypeList').setValue(flag ? this.basicPreviousData.locationId : '');
    this.guarantorForm.get('location').setValue(flag ? this.basicPreviousData.locationName : '');
    this.guarantorForm.get('lane').setValue(flag ? this.basicPreviousData.street : "");
    this.guarantorForm.get('zipcode').setValue(flag ? this.basicPreviousData.ZIPCODE : "");
    this.guarantorForm.get('phoneTypeList').setValue(flag ? this.basicPreviousData.PHONETYPEID : "")
    this.guarantorForm.get('phoneTypeName').setValue(flag ? this.basicPreviousData.PHONETYPE : "")
    this.guarantorForm.get('number').setValue(flag ? this.basicPreviousData.PHONE : "");
    this.guarantorForm.get('city').setValue(flag ? this.basicPreviousData.county : '');
    this.guarantorForm.get('state').setValue(flag ? this.basicPreviousData.state : '');
    this.guarantorForm.get('county').setValue(flag ? this.basicPreviousData.county : '');
    this.guarantorForm.get('timeZone').setValue(flag ? this.basicPreviousData.timezone : '');
    this.guarantorForm.get('country').setValue(flag ? this.basicPreviousData.country : '');
  }
  public SelfCheck(event?,dropdown?:boolean): void {
    let flag = event!=null? event.target.checked:dropdown;
    console.log("selfcheck")
    this.guarantorForm.get('relationshipList').setValue(flag ? 100 : '');
    this.guarantorForm.get('relationId').setValue(flag ? 'SELF' : '');
    this.guarantorForm.get('lastName').setValue(flag ? this.basicPreviousData.lastname : '');
    this.guarantorForm.get('firstName').setValue(flag ? this.basicPreviousData.firstname : '');
    this.guarantorForm.get('ssn').setValue(flag ? this.basicPreviousData.ssn : '');
    flag ? this.checkBoxAddress = true : this.checkBoxAddress = false;
    // flag ? this.addressCheck(event) : this.addressCheck(event);
    this.addressCheck(event,dropdown);
  }
  public getPreviousBasic(): void {
    this.router.navigateByUrl('registration-re/child-basic')
  }

  // for update data
  private getGuarantorDetails() {
    let session: any = JSON.parse(sessionStorage.getItem('guarantorDetails'));
    this.guarantorId = session.psGuarId;
    let params = { 'guarantorId': session.psGuarId }
    try {
      // console.log("$$$$$$$$$$$$$$",params,session)
      this.service.getGuarantorDetails(JSON.stringify(params)).subscribe(
        response => {
          let data: any = response;
          console.log(data)
          this.guarantorForm.get('relationshipList').setValue(data.relationshipId);
          this.guarantorForm.get('relationId').setValue('SELF');//data.relationshipName
          this.guarantorForm.get('occupationName').setValue('occuptaion');//data.occuptaionname
          this.guarantorForm.get('occupationList').setValue(data.occupationId);//data.occuptaionname
          this.guarantorForm.get('lastName').setValue(data.lastname);
          this.guarantorForm.get('firstName').setValue(data.firstname);
          this.guarantorForm.get('ssn').setValue(data.ssn);

          //address
          this.guarantorForm.get('addressTypeList').setValue(data.locationId);
          this.guarantorForm.get('location').setValue(data.locationName);
          this.guarantorForm.get('lane').setValue(data.street);
          this.guarantorForm.get('zipcode').setValue(data.ZIPCODE);
          this.guarantorForm.get('phoneTypeList').setValue(data.PHONETYPEID)
          this.guarantorForm.get('phoneTypeName').setValue(data.PHONETYPE)
          this.guarantorForm.get('number').setValue(data.PHONE);
          this.guarantorForm.get('city').setValue(data.county);
          this.guarantorForm.get('state').setValue(data.state);
          this.guarantorForm.get('county').setValue(data.county);
          this.guarantorForm.get('timeZone').setValue(data.timezone);
          this.guarantorForm.get('country').setValue(data.country);

        }
      )

    } catch (error) {
      console.log(error)
    }

  }
   public relationshipCleared(event){
     console.log(event)
   }
}
