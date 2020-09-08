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
  @Input() popup:boolean;
  modelref:BsModalRef;
  public psId:number=0;
  public basicForm: FormGroup;
  public lookupDetails: any;
  public saluationList: any;
  public addressTypeList: any;
  public maritalStatusList: any;
  public raceIdList: any;
  public phoneTypeList: any;
  public SaveResponse: any;
  public genderList: any;
  public Keyword = 'label';
  public locationName;
  public siteId: number;
  public zipDetails: any;
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
  // tslint:disable-next-line: max-line-length
  constructor(private fb: FormBuilder,public modalService:BsModalService ,public service: ZipcodeService, public date: DatePipe, private router: Router, private http: HttpClient) {
    console.log("basic constructer",this.popup);
    this.newForm();
    // let userExist = sessionStorage.getItem('psDetails');
    // if (userExist) {
    //   this.previousBasicInfo();
    // }

  }
  ngOnInit() {

    console.log("basic");
    this.basicDetails();
  }

  private newForm(): void {
    this.basicForm = this.fb.group({
      location: [''],
      address: [''],
      phonetype: [''],
      maritalStatus: [''],
      race: [''],
      gender: [''],
      saluation: [''],
      saluationId: ['', Validators.required],
      site: ['', Validators.required],
      genderId: ['', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      raceId: ['', Validators.required],
      ssn: [''],
      number: ['', Validators.required],
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
      siteName: ['', Validators.required]
    });
  }
  get f() {
    return this.basicForm.controls;

  }
  dob1;
  public onSubmit(): void {

    console.log(this.basicForm.valid)
    if (this.basicForm.valid) {
      let mappedArray = this.siteSelectedItems.length > 0 ? (this.siteSelectedItems.map(a => a.id)) : [0];

      const jsonObj = {
        "saluationId": (this.basicForm.value.saluationId),
        "genderId": (this.basicForm.value.genderId),
        "lastName": (this.basicForm.value.lastName),
        "firstName": (this.basicForm.value.firstName),
        "raceId": (this.basicForm.value.raceId),
        "maritalStatusID": (this.basicForm.value.maritalStatusList),
        "dob": this.date.transform(this.basicForm.value.dob, 'MM/dd/yyyy'),
        "locationId": (this.basicForm.value.addressTypeList),
        "city": (this.basicForm.value.city),
        "addressLine": (this.basicForm.value.lane),
        "zipcode": (this.basicForm.value.zipcode),
        "phoneTypeid": (this.basicForm.value.phoneTypeList),
        "phone": (this.basicForm.value.number),
        "officeId": (this.siteId),
        "updatedUserId": "47",
        "psId": this.psId,
        "mappedOfficeIds": mappedArray.toString(),
      };
      console.log(JSON.stringify(jsonObj));
      let parameters = JSON.stringify(jsonObj)
      try {
        this.service.savePs(parameters).subscribe(res => {
          this.SaveResponse = res;
          console.log(res, 'getting the psId details');
          // alert(JSON.stringify(this.SaveResponse));
          if (Object.keys(this.SaveResponse).length !== 0) {
            if(this.popup){
              this.modelref.hide();

            }else{
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
      swal.fire({
        title: 'Invalid Form',
        text: 'Fill the all Required fields',
        icon: 'error',
        confirmButtonText: 'Ok',
        allowOutsideClick: false
      })
      console.log(this.basicForm.value)

    }

  }

  private basicDetails(): void {
    let jsonObj = { 'userId': '47' };

    this.service.getLookupDetails(JSON.stringify(jsonObj)).subscribe(data => {
      this.lookupDetails = data;
      console.log(this.lookupDetails);
      this.saluationList = this.lookupDetails.salutationList;
      this.userMappedOffices = this.lookupDetails.userMappedOffices;
      this.addressTypeList = this.lookupDetails.addressTypeList;
      this.maritalStatusList = this.lookupDetails.maritalStatusList;
      this.raceIdList = this.lookupDetails.raceList;
      this.phoneTypeList = this.lookupDetails.phoneTypeList;
      this.genderList = this.lookupDetails.genderList;
    });
  }

  public selectChange(event, field): void {

    if (field === 'genderId') {
      this.basicForm.get('genderId').setValue(event.id);
    }
    if (field === 'site') {
      this.basicForm.get('site').setValue(event.id);
      this.siteId = event.id;
      console.log(this.siteId);
    }
    if (field === 'raceId') {
      this.basicForm.get('raceId').setValue(event.id);
    }
    if (field === 'maritalStatusList') {
      this.basicForm.get('maritalStatusList').setValue(event.id);
    }
    if (field === 'saluationId') {
      this.basicForm.get('saluationId').setValue(event.id);
    }
    if (field === 'addressTypeList') {
      this.basicForm.get('addressTypeList').setValue(event.id);
      this.locationName = event.label;

    }
    if (field === 'phoneTypeList') {
      this.basicForm.get('phoneTypeList').setValue(event.id);
    }
    if (field === 'state') {
      this.basicForm.get('phoneTypeList').setValue(event.id);
    }

  }

  getzip(event): void {
    const zip = this.basicForm.get('zipcode').value;
    // console.log(zip)
    if (zip.length === 5) {
      this.service.getZipcodeDetails(zip).subscribe(data => {
        console.log(data);
        this.zipDetails = data;
        this.basicForm.get('city').setValue(this.zipDetails.city);
        this.basicForm.get('country').setValue(this.zipDetails.country);
        this.basicForm.get('county').setValue(this.zipDetails.county);
        this.basicForm.get('timeZone').setValue(this.zipDetails.timeZone);
        this.basicForm.get('state').setValue(this.zipDetails.state);

      });
    }
  }
  private previousBasicInfo(): void {
    this.previousPsDetails = JSON.parse(sessionStorage.getItem('psDetails'));
    this.psId=this.previousPsDetails.psId;
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
        this.basicForm.get('race').setValue(this.basicPreviousDetails.race);
        this.basicForm.get('maritalStatus').setValue(this.basicPreviousDetails.MARITIALSTATUS);
        this.basicForm.get('maritalStatusList').setValue(this.basicPreviousDetails.MARITIALSTATUSId);
        this.basicForm.get('city').setValue(this.basicPreviousDetails.county);
        this.basicForm.get('country').setValue(this.basicPreviousDetails.country);
        this.basicForm.get('county').setValue(this.basicPreviousDetails.county);
        this.basicForm.get('timeZone').setValue(this.basicPreviousDetails.timezone);
        this.basicForm.get('state').setValue(this.basicPreviousDetails.state);
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

}
