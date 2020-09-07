import { Component, OnInit, TemplateRef } from "@angular/core";
import { ZipcodeService } from "../../../services/zipcode.service";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: "app-admission-details",
  templateUrl: "./admission-details.component.html",
  styleUrls: ["./admission-details.component.scss"],
})
export class AdmissionDetailsComponent implements OnInit {
  public bsModelRef: BsModalRef;
  public Keyword = 'userName'
  public coordinatorList = [];
  //code;
  field1;
  I;
  id = 'id';
  name = 'name'
  code = 'code'
  public tableData = {
    "salutationList": [
      { "id": 401, "label": "karunya", "id1": 1, "label1": "Home111" },
      { "id": 402, "label": "miss", "id1": 2, "label1": "Work" },
      { "id": 403, "label": "diana", "id1": 3, "label1": "School" },
      { "id": 404, "label": "asha", "id1": 4, "label1": "Other" }
    ]
  }
  name1: any;
  public fieldArray: Array<any> = [];
  public newAttribute: any = {};
  rows: any;
  ds: any;

  constructor(public service: ZipcodeService, public modalService: BsModalService) { }
  ngOnInit() {
    this.newAttribute = { rank: null, name: '', code: '' };
    this.fieldArray.push(this.newAttribute)

    this.getAdmissionLookups();
  }

  public getAdmissionLookups(): void {
    let params = { "userId": 47 }
    this.service.getAdmissionLookups(JSON.stringify(params)).subscribe(
      data => {
        console.log(data)
        let data1: any = data;
        this.coordinatorList = data1.coordinatorList
      })
    }



addFieldValue(template: TemplateRef<any>) {
      // this.fieldArray.push(this.newAttribute)
      // this.newAttribute = {};
      this.bsModelRef = this.modalService.show(template, { class: 'registration-modal-container modal-dialog-centered modal-dialog-scrollable' });

    }


  deleteFieldValue(index) {
      if(this.fieldArray.length !== 1) {
      this.fieldArray.splice(index, 1);
      console.log(this.fieldArray.length);
    }
    if (this.fieldArray.length === 0) {
      console.log(this.fieldArray.length);
      alert('value cant be null');
    }
  }

  // getDiagnosisCode(el) {
  // this.newAttribute = { rank: '', name: '', code: '' };
  // this.fieldArray.push(this.newAttribute);
  // console.log(this.newAttribute);


  // }
  public displayName(event) {
    // console.log("jhgfdasdfghjkl");

    // this.diagnosisData.forEach((ele) => {
    //   console.log(event.target.value);
    //   if ((event.target.value).toUpperCase() === ele.diagnosisCode) {
    //     alert("hdfghjkl;'");
    //     console.log(ele.diagnosisCode)
    //     console.log(event.target.value);
    //     this.I = ele.diagnosisName;
    //     console.log(this.I);

    //   }
    // });


  }


}
