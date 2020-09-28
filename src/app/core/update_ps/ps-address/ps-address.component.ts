import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ZipcodeService } from 'src/app/services/zipcode.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ps-address',
  templateUrl: './ps-address.component.html',
  styleUrls: ['./ps-address.component.sass']
})
export class PsAddressComponent implements OnInit {
// Variables used in code
  @Input() popup: boolean;
  modelref: BsModalRef;
  public psAddressForm: FormGroup;
  public formError: boolean = false;
  public Keyword = 'name';
  public lookupDetails: any;
  public addressTypeList: any;
  public phoneTypeList: any;
  public zipDetails: any;
  private countryId: any;
  private stateId: any;
  private countyId: any;
  private timeZoneId: any;
  public SaveResponse:any;

  constructor(
    private fb: FormBuilder,
    public modalService: BsModalService,
    public service: ZipcodeService,
    public date: DatePipe,
    private router: Router,
    private http: HttpClient
  ) {
    this.newForm();
  }

  ngOnInit(): void {
    this.getContactLookups();
  }
  // Code for FormGroup and FormControlNames
  private newForm(): void {
    this.psAddressForm = this.fb.group({
      addressType: ['',Validators.required],
      location: ['', Validators.required],

      addressLine1: ['',Validators.required],
      addressLine2: [''],
      number: ['', [Validators.required]],
      number2: [''],
      number3: [''],
      addressTypeList: ['', Validators.required],
      phoneTypeList: ['', Validators.required],
      phoneTypeList2: ['', Validators.required],
      phoneTypeList3: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
      zipFourCode: [''],
      country: ['', Validators.required],
      county: ['', Validators.required],
      state: ['', Validators.required],
      timeZone: ['', Validators.required],
      fax: [''],
      email: [''],
      directions: [''],
    });
  }
  get f() {
    return this.psAddressForm.controls;
  }
  // Get lookups for the contact form
  public getContactLookups() {
    this.service.getContactLookups().subscribe((data) => {
      this.lookupDetails = data;
      console.log(this.lookupDetails);
      this.addressTypeList = this.lookupDetails.addressType;
      this.phoneTypeList = this.lookupDetails.phoneType;
    });
  }
  // Get zipcode data
  public getzip(): void {
    const zip = this.psAddressForm.get('zipcode').value;

    if (zip.toString().length === 5) {
      this.service.getZipcodeDetails(zip).subscribe((data) => {
        let responseFlag = Object.keys(data).length !== 0 ? true : false;
        responseFlag
          ? (this.zipDetails = data)
          : swal.fire({
              title: 'Invalid Zip Code',
              text: 'Please enter a valid Zip code.',
              icon: 'warning',
              confirmButtonText: 'Ok',
              allowOutsideClick: false,
            });
        console.log(data);
        this.stateId = responseFlag ? data.stateId : null;
        this.countyId = responseFlag ? data.countyId : null;
        this.timeZoneId = responseFlag ? data.timeZoneId : null;
        this.countryId = responseFlag ? data.countryId : null;
        this.psAddressForm
          .get('city')
          .setValue(responseFlag ? this.zipDetails.city : '');
        this.psAddressForm
          .get('country')
          .setValue(responseFlag ? this.zipDetails.country : '');
        this.psAddressForm
          .get('county')
          .setValue(responseFlag ? this.zipDetails.county : '');
        this.psAddressForm
          .get('timeZone')
          .setValue(responseFlag ? this.zipDetails.timeZone : '');
        this.psAddressForm
          .get('state')
          .setValue(responseFlag ? this.zipDetails.state : '');
      });
    }

  }
   // Code for setting the values in contact form for autocomplete fields
   public setAutocompleteValue(event, field, flag: boolean): void {

    if (field === 'addressTypeList') {
      flag
        ? this.psAddressForm.get('addressTypeList').setValue(event.id)
        : this.psAddressForm.get('addressTypeList').setValue('');
    //  this.locationName = event.label;
    }
    if (field === 'phoneTypeList') {
      flag
        ? this.psAddressForm.get('phoneTypeList').setValue(event.id)
        : this.psAddressForm.get('phoneTypeList').setValue('');
    }
    if (field === 'phoneTypeList2') {
      flag
        ? this.psAddressForm.get('phoneTypeList2').setValue(event.id)
        : this.psAddressForm.get('phoneTypeList2').setValue('');
    }
    if (field === 'phoneTypeList3') {
      flag
        ? this.psAddressForm.get('phoneTypeList3').setValue(event.id)
        : this.psAddressForm.get('phoneTypeList3').setValue('');
    }

  }
// Setting a format for phone numbers
public PhoneNumFormat(event, flag, value?) {
  var input = event != null ? event.target.value : value;

    if (flag == 'phone') {
      this.psAddressForm.get('number').setValue(this.service.PhoneNumFormat(input,12));
    } else if (flag == 'phone2') {
      this.psAddressForm.get('number2').setValue(this.service.PhoneNumFormat(input,12));
    } else if (flag == 'phone3') {
      this.psAddressForm.get('number3').setValue(this.service.PhoneNumFormat(input,12));
    }
}
// Code for validating the input for the phone number
private phoneValidation() {
  let phone1Flag: boolean;
  let phone2Flag: boolean;
  let phone3Flag: boolean;
  if (
    (this.psAddressForm.value.number != undefined || null) &&
    this.psAddressForm.value.number.length > 0
  ) {
    console.log('phone1', this.psAddressForm.value.number.length);
    if (this.psAddressForm.value.number.length == 12) {
      var phone1areacode = this.psAddressForm.value.number.slice(0, 3);
      var phone1exchangecode = this.psAddressForm.value.number.slice(4, 7);
      if (
        phone1areacode >= 1 &&
        phone1areacode >= 199 &&
        phone1exchangecode >= 1 &&
        phone1exchangecode >= 199
      ) {
        phone1Flag = false;
      } else {
        // phone1Flag = true;
        if (phone1areacode <= 1 || phone1areacode <= 199) {
          console.log('area code missing');
          this.alertbox(
            'Area Code (first 3 digits) should not be in between 001 and 199 for Phone '
          );
        }
        if (phone1exchangecode <= 1 || phone1exchangecode <= 199) {
          console.log('area exchange code missing');

          this.alertbox(
            'Exchange (middle 3 digits)  should not be in between 001 and 199 for Phone '
          );
        }
      }
      console.log('phone1 flag is', phone1Flag);
    } else {
      phone1Flag = true;
      this.alertbox('Phone1 should be 10 digits');
    }
  }
  if (
    (this.psAddressForm.value.number2 != undefined || null) &&
    this.psAddressForm.value.number2.length > 0
  ) {
    console.log('phone2', this.psAddressForm.value.number2.length);
    if (this.psAddressForm.value.number2.length == 12) {
      var phone2areacode = this.psAddressForm.value.number2.slice(0, 3);
      var phone2exchangecode = this.psAddressForm.value.number2.slice(4, 7);
      if (
        phone2areacode >= 1 &&
        phone2areacode >= 199 &&
        phone2exchangecode >= 1 &&
        phone2exchangecode >= 199
      ) {
        phone2Flag = false;
      } else {
        phone2Flag = true;
        if (phone2areacode <= 1 || phone2areacode <= 199) {
          this.alertbox(
            'Area Code (first 3 digits) should not be in between 001 and 199 for Phone 2'
          );
        }
        if (phone2exchangecode <= 1 || phone2exchangecode <= 199) {
          this.alertbox(
            'Exchange (middle 3 digits)  should not be in between 001 and 199 for Phone 2'
          );
        }
      }
      console.log('phone2 flag is', phone2Flag);
    } else {
      phone2Flag = true;
      this.alertbox('Phone 2 should be 10 digits');
    }
  }
  if (
    (this.psAddressForm.value.number3 != undefined || null) &&
    this.psAddressForm.value.number3.length > 0
  ) {
    console.log('phone3', this.psAddressForm.value.number3.length);
    if (this.psAddressForm.value.number3.length == 12) {
      var phone3areacode = this.psAddressForm.value.number3.slice(0, 3);
      var phone3exchangecode = this.psAddressForm.value.number3.slice(4, 7);
      if (
        phone3areacode >= 1 &&
        phone3areacode >= 199 &&
        phone3exchangecode >= 1 &&
        phone3exchangecode >= 199
      ) {
        phone3Flag = false;
      } else {
        phone3Flag = true;
        if (phone3areacode <= 1 || phone3areacode <= 199) {
          this.alertbox(
            'Area Code (first 3 digits) should not be in between 001 and 199 for Phone 3 '
          );
        }
        if (phone3exchangecode <= 1 || phone3exchangecode <= 199) {
          this.alertbox(
            'Exchange (middle 3 digits)  should not be in between 001 and 199 for Phone 3'
          );
        }
      }
      console.log('phone1 flag is', phone3Flag);
    } else {
      phone3Flag = true;
      this.alertbox('Phone3 should be 10 digits');
    }
  }
  if (!phone3Flag && !phone2Flag && !phone1Flag) {

    console.log('all are valid phone nums');
  }
}
 // Code of alert for invalid phone number input
private alertbox(string) {
  var message = 'Invalid Number';
  swal.fire(message, string, 'warning');
}

   // Code for saving the contact form
   private saveAddressForm() {
    const jsonObj = {
     // psId: this.psId,
      locationId: this.psAddressForm.value.addressTypeList,
      city: this.psAddressForm.value.city,
      addressLine: this.psAddressForm.value.addressLine1,
      addressLine2: this.psAddressForm.value.addressLine2,
      zipcode: this.psAddressForm.value.zipcode,
      phoneTypeid: this.psAddressForm.value.phoneTypeList,
      phone: this.psAddressForm.value.number.replace(/-/g, ''),
      stateId: this.stateId,
      countyId: this.countyId,
      timeZoneId: this.timeZoneId,
      countryId: this.countryId,
     // updatedUserId: this.userId,
      zip4Code: this.psAddressForm.value.zip4Code,
      phoneTypeid2: this.psAddressForm.value.phoneTypeid2,
      phone2: this.psAddressForm.value.number2.replace(/-/g, ''),
      phoneTypeid3: this.psAddressForm.value.phoneTypeid3,
      phone3: this.psAddressForm.value.number3.replace(/-/g, ''),
      fax: this.psAddressForm.value.fax,
      email:this.psAddressForm.value.email,
      directions: this.psAddressForm.value.directions,
    };
    console.log(JSON.stringify(jsonObj));
    let parameters = JSON.stringify(jsonObj);
    try {
      this.service.savePs(parameters).subscribe((res) => {
        this.SaveResponse = res;
        console.log(res, 'getting the psId details');
        // alert(JSON.stringify(this.SaveResponse));
        // if (Object.keys(this.SaveResponse).length !== 0) {
        //   if (this.popup) {
        //     this.modelref.hide();
        //   } else {
        //     console.log(JSON.stringify(jsonObj));
        //     sessionStorage.setItem(
        //       'psDetails',
        //       JSON.stringify(this.SaveResponse)
        //     );
        //     this.service.showSuccess('PS saved Succssfully!');
        //     //this.router.navigateByUrl('registration-re/child-guarantor');
        //   }
        // }
      });
    } catch (error) {}
  }
  // Code for submitting the contact form
  public onSubmit(): void {
    console.log(this.psAddressForm.value);

    this.formError = true;

    if (this.psAddressForm.valid ) {
     // this.phoneValidation();
    } else if (
      this.psAddressForm.invalid
    ) {
      swal.fire({
        title: 'Invalid Form',
        text: 'Fill all the Required fields',
        icon: 'error',
        confirmButtonText: 'Ok',
        allowOutsideClick: false,
      });
      console.log(this.psAddressForm.value);
    }

  }

}
