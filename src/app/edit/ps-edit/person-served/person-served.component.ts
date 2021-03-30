import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SelectItemGroup } from 'primeng/api';
import { FilterService } from "primeng/api";


@Component({
  selector: 'app-person-served',
  templateUrl: './person-served.component.html',
  styleUrls: ['./person-served.component.sass'],
  providers: [FilterService]
})
export class PersonServedComponent implements OnInit {


  public modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private _fb: FormBuilder, private filterService: FilterService
  ) { };

  public psForm: FormGroup;
  public genderList: any[];
  selectedCountry:any;
  ngOnInit(): void {
    console.log("yess")
 this.intialForm();
    this.genderList = [
      {name:"MALE",'value':'M'},
      {name:"FEMALE",'value':'F'},
      {name:"Others",'value':'O'},
      {name:"male",'value':'m'},
      {name:"female",'value':'f'}



    ]

  }
  public pslogdata(pslog: TemplateRef<any>) {
    this.modalRef = this.modalService.show(pslog);
  }

  public intialForm() {
    this.psForm = this._fb.group({
      lastName: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
      middleName: new FormControl(null, [Validators.required]),
      alias: new FormControl(null, [Validators.required]),
      gender: new FormControl('', [Validators.required]),


    })
  }
  val = '';

  texts: string[];




  filterCountry(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.genderList.length; i++) {
      let country = this.genderList[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredCountries = filtered;

  }
  public filteredCountries: any[];

ngOnDestroy(){
  console.log("PS Destroy")
}
}
