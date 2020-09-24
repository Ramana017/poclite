import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ZipcodeService } from 'src/app/services/zipcode.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-ps-contacts',
  templateUrl: './ps-contacts.component.html',
  styleUrls: ['./ps-contacts.component.sass']
})
export class PsContactsComponent implements OnInit {

  public contactForm: FormGroup;
  public formError: boolean = false;
  public lookupDetails: any;
  public saluationList: any;
  public addressTypeList: any;
  public maritalStatusList: any;
  public LanguageList: any;
  public relationshipList: any;
  public raceIdList: any;
  public phoneTypeList: any;
  public SaveResponse: any;
  public genderList: any;
  public Keyword = 'name';
  public zipDetails: any;
  private stateId: any;
  private countyId: any;
  private timeZoneId: any;
  public countryId: any;
  public currentDate: Date = new Date()

  constructor(private fb: FormBuilder,public service: ZipcodeService) {
    this.newForm();
   }

  ngOnInit(): void {
  }
  private newForm(): void {
    this.contactForm = this.fb.group({
      location: ['', Validators.required],
      phonetype: ['', Validators.required],
      phonetype2: ['', Validators.required],
      phonetype3: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      race: ['', Validators.required],
      gender: ['', Validators.required],
      saluation: ['', Validators.required],
      saluationId: ['', Validators.required],
      middleName: [''],
      alias: [''],
      site: [''],
      language: ['', Validators.required],
      languageId: ['', Validators.required],
      genderId: ['', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      raceId: ['', Validators.required],
      ssn: [''],
      addressLine1: [''],
      addressLine2: [''],
      number: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      number2: [''],
      number3: [''],
      maritalStatusList: ['', Validators.required],
      addressTypeList: ['', Validators.required],
      phoneTypeList: ['', Validators.required],
      phoneTypeList2: ['', Validators.required],
      phoneTypeList3: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
      zipFourCode : [''],
      country: ['', Validators.required],
      county: ['', Validators.required],
      state: ['', Validators.required],
      timeZone: ['', Validators.required],
      dob: ['', Validators.required],
      siteName: [''],
      fax: [''],
      email: [''],
      directions : ['']
    });
  }
  get f() {
    return this.contactForm.controls;

   }
  public  onSubmit(){

   }
   public basicDetails() {
    this.service.getLookupsDataBasic().subscribe(data => {
      this.lookupDetails = data;
      console.log(this.lookupDetails)
      this.relationshipList = this.lookupDetails.relationship;
      this.LanguageList = this.lookupDetails.language;
      this.saluationList = this.lookupDetails.salutation;
      this.addressTypeList = this.lookupDetails.addressType;
      this.maritalStatusList = this.lookupDetails.maritialStatus;
      this.raceIdList = this.lookupDetails.race;
      this.phoneTypeList = this.lookupDetails.phoneType;
      this.genderList = this.lookupDetails.gender;
    })

  }
  public selectChange(event, field, flag: boolean): void {

    if (field === 'genderId') {
      if (flag) {
        console.log("Ramana")
        this.contactForm.get('genderId').setValue(event.id);
        if (event.name == "MALE") {
          this.contactForm.get('saluation').setValue(flag ? "MR" : '');
          this.contactForm.get('saluationId').setValue(flag ? "MR" : '');
        } else if (event.name == "FEMALE") {
          this.contactForm.get('saluation').setValue(flag ? "MS" : '');
          this.contactForm.get('saluationId').setValue(flag ? "MS" : '');
        }
      } else {
        this.contactForm.get('saluation').setValue('');
        this.contactForm.get('saluationId').setValue('');
        this.contactForm.get('genderId').setValue('');
      }
    }
    
    if (field === 'raceId') {
      flag ? this.contactForm.get('raceId').setValue(event.id) : this.contactForm.get('raceId').setValue('');;
    }
    if (field === 'maritalStatusList') {
      flag ? this.contactForm.get('maritalStatusList').setValue(event.id) : this.contactForm.get('maritalStatusList').setValue('');
    }
    if (field === 'saluationId') {
      flag ? this.contactForm.get('saluationId').setValue(event.id) : this.contactForm.get('saluationId').setValue('');
    }
    if (field === 'addressTypeList') {
      flag ? this.contactForm.get('addressTypeList').setValue(event.id) : this.contactForm.get('addressTypeList').setValue('');
     // this.locationName = event.label;

    }
    if (field === 'phoneTypeList') {
      flag ? this.contactForm.get('phoneTypeList').setValue(event.id) : this.contactForm.get('phoneTypeList').setValue('');
    }
    if (field === 'phoneTypeList2') {
      flag ? this.contactForm.get('phoneTypeList2').setValue(event.id) : this.contactForm.get('phoneTypeList2').setValue('');
    }
    if (field === 'phoneTypeList3') {
      flag ? this.contactForm.get('phoneTypeList3').setValue(event.id) : this.contactForm.get('phoneTypeList3').setValue('');
    }
    // if (field === 'state') {
    //   flag ? this.basicEditForm.get('phoneTypeList').setValue(event.id) : this.basicEditForm.get('phoneTypeList').setValue('');
    // }
    // if (field === 'languageId') {
    //   flag ? this.basicEditForm.get('languageId').setValue(event.id) : this.basicEditForm.get('languageId').setValue('');
    // }

  }
  getzip(): void {
    const zip = this.contactForm.get('zipcode').value;
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
          this.contactForm.get('city').setValue(this.zipDetails.city);
          this.contactForm.get('country').setValue(this.zipDetails.country);
          this.contactForm.get('county').setValue(this.zipDetails.county);
          this.contactForm.get('timeZone').setValue(this.zipDetails.timeZone);
          this.contactForm.get('state').setValue(this.zipDetails.state);
        }

        else {
          swal.fire({
            title: 'Invalid Zip Code',
            text: 'Please enter a valid Zip code.',
            icon: 'warning',
            confirmButtonText: 'Ok',
            allowOutsideClick: false
          })
          this.contactForm.get('city').setValue('');
          this.contactForm.get('country').setValue('');
          this.contactForm.get('county').setValue('');
          this.contactForm.get('timeZone').setValue('');
          this.contactForm.get('state').setValue('');
          this.contactForm.get('zipcode').setValue('');
          this.stateId = ''
          this.countyId = ''
          this.timeZoneId = ''
          this.countryId = ''
        }

      });
    }
  }
  public PhoneNumFormat(event, flag) {
    // console.log("++++++++++", event.target.value)
    var input2 = event.target.value.replace(/\D/g, '');
    flag == "ssn" ? this.contactForm.get('ssn').setValue(input2) : this.contactForm.get('number').setValue(input2);
  }

}
