import { OnDestroy, TemplateRef } from '@angular/core';
import { Input, Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

declare var $: any;

@Component({
  selector: 'app-assign-dcs',
  templateUrl: './assign-dcs.component.html',
  styleUrls: ['./assign-dcs.component.sass']
})
export class AssignDCSComponent implements OnDestroy, OnInit {
  public availabilityCheck: boolean = true;
  public scheduleArray: Array<any> = ['Yes', 'No'];
   public criteriaList:Array<any>=[
    {
    "criteriaId": 1,
    "criteriaName": "Qualifications",
    "enabled": 0,
    "scheduleCriteriaId": 301219
    },
    {
    "criteriaId": 2,
    "criteriaName": "Preferences",
    "enabled": 1,
    "scheduleCriteriaId": 301220
    },
    {
    "criteriaId": 3,
    "criteriaName": "Scheduled DCS",
    "enabled": 1,
    "scheduleCriteriaId": 301221
    },
    {
    "criteriaId": 4,
    "criteriaName": "Previously Served PS",
    "enabled": 1,
    "scheduleCriteriaId": 301222
    },
    {
    "criteriaId": 5,
    "criteriaName": "Shared DCS",
    "enabled": 1,
    "scheduleCriteriaId": 301223
    },
    {
    "criteriaId": 6,
    "criteriaName": "Get Preferred DCS",
    "enabled": 0,
    "scheduleCriteriaId": 301224
    },
    {
    "criteriaId": 7,
    "criteriaName": "Get UnAvailable DCS",
    "enabled": 1,
    "scheduleCriteriaId": 301225
    },
    {
    "criteriaId": 8,
    "criteriaName": "Do-not Use \"Un Preferred DCS\"",
    "enabled": 0,
    "scheduleCriteriaId": 301226
    },
    {
    "criteriaId": 9,
    "criteriaName": "Get Family Serving Family DCS",
    "enabled": 0,
    "scheduleCriteriaId": 301227
    }
    ]
  public assignDCSList: Array<any> = [
    {
    "dcsId": 14634,
    "overtimeFlag": 1,
    "dcsName": "ADAMS, CAMILLE",
    "termination_compare_flag": ""
    },
    {
    "dcsId": 14635,
    "overtimeFlag": 0,
    "dcsName": "ADAMS, JOHN",
    "termination_compare_flag": ""
    },
    {
    "dcsId": 946,
    "overtimeFlag": 0,
    "dcsName": "ADAMS, TAMMY",
    "termination_compare_flag": ""
    },
    {
    "dcsId": 14619,
    "overtimeFlag": 0,
    "dcsName": "ALFORD, ASHLEE",
    "termination_compare_flag": ""
    },
    {
    "dcsId": 15731,
    "overtimeFlag": 0,
    "dcsName": "ATKINSON, JANICE",
    "termination_compare_flag": ""
    },
    {
    "dcsId": 14638,
    "overtimeFlag": 0,
    "dcsName": "AVERY, MANDY",
    "termination_compare_flag": ""
    },
    {
    "dcsId": 14618,
    "overtimeFlag": 0,
    "dcsName": "BANKS, ALLISON",
    "termination_compare_flag": ""
    },
    {
    "dcsId": 14622,
    "overtimeFlag": 0,
    "dcsName": "BANKS, LYNDA",
    "termination_compare_flag": ""
    },
    {
    "dcsId": 15554,
    "overtimeFlag": 0,
    "dcsName": "BARRETT, SHEILA",
    "termination_compare_flag": ""
    },
    {
    "dcsId": 14659,
    "overtimeFlag": 0,
    "dcsName": "BENHAM, PAMELA",
    "termination_compare_flag": ""
    }
    ]

    public availableDCSList=[
      {
      "dcsId": 14634,
      "totalVisits": 1,
      "previouslyServed": "Yes",
      "preferences": "Yes",
      "prefColorFlag": 0,
      "overtimeFlag": 1,
      "dcsName": "ADAMS, CAMILLE",
      "preference": 0,
      "familyServingFamily": "No",
      "unAvailableVisitCount": 0,
      "resourceNumber": "112233446",
      "preferedPS": "",
      "unAvailableDCS": 1,
      "countOfVisits": 1,
      "qualifications": "Yes",
      "visitCount": "1/1",
      "sharedDCS": "No",
      "availableVisitCount": 0,
      "previouslyServedCount": 32,
      "visitIds": "4688270",
      "conflict": "No"
      },
      {
      "dcsId": 14635,
      "totalVisits": 1,
      "previouslyServed": "No",
      "preferences": "Yes",
      "prefColorFlag": 0,
      "overtimeFlag": 0,
      "dcsName": "ADAMS, JOHN",
      "preference": 0,
      "familyServingFamily": "No",
      "unAvailableVisitCount": 0,
      "preferedPS": "",
      "unAvailableDCS": 1,
      "countOfVisits": 1,
      "qualifications": "No",
      "visitCount": "1/1",
      "sharedDCS": "No",
      "availableVisitCount": 0,
      "previouslyServedCount": 0,
      "visitIds": "4688270",
      "conflict": "Yes"
      },
      {
      "dcsId": 946,
      "totalVisits": 1,
      "previouslyServed": "No",
      "preferences": "Yes",
      "prefColorFlag": 0,
      "overtimeFlag": 0,
      "dcsName": "ADAMS, TAMMY",
      "preference": 0,
      "familyServingFamily": "No",
      "unAvailableVisitCount": 0,
      "preferedPS": "",
      "unAvailableDCS": 1,
      "countOfVisits": 1,
      "qualifications": "No",
      "visitCount": "1/1",
      "sharedDCS": "Yes",
      "availableVisitCount": 0,
      "previouslyServedCount": 0,
      "visitIds": "4688270",
      "conflict": "No"
      },
      {
      "dcsId": 14619,
      "totalVisits": 1,
      "previouslyServed": "No",
      "preferences": "Yes",
      "prefColorFlag": 0,
      "overtimeFlag": 0,
      "dcsName": "ALFORD, ASHLEE",
      "preference": 0,
      "familyServingFamily": "No",
      "unAvailableVisitCount": 0,
      "preferedPS": "",
      "unAvailableDCS": 1,
      "countOfVisits": 1,
      "qualifications": "No",
      "visitCount": "1/1",
      "sharedDCS": "No",
      "availableVisitCount": 0,
      "previouslyServedCount": 0,
      "visitIds": "4688270",
      "conflict": "No"
      },
      {
      "dcsId": 15731,
      "totalVisits": 1,
      "previouslyServed": "No",
      "preferences": "Yes",
      "prefColorFlag": 0,
      "overtimeFlag": 0,
      "dcsName": "ATKINSON, JANICE",
      "preference": 0,
      "familyServingFamily": "No",
      "unAvailableVisitCount": 0,
      "preferedPS": "",
      "unAvailableDCS": 1,
      "countOfVisits": 1,
      "qualifications": "No",
      "visitCount": "1/1",
      "sharedDCS": "No",
      "availableVisitCount": 0,
      "previouslyServedCount": 0,
      "visitIds": "4688270",
      "conflict": "No"
      },
      {
      "dcsId": 14638,
      "totalVisits": 1,
      "previouslyServed": "No",
      "preferences": "Yes",
      "prefColorFlag": 0,
      "overtimeFlag": 0,
      "dcsName": "AVERY, MANDY",
      "preference": 0,
      "familyServingFamily": "No",
      "unAvailableVisitCount": 0,
      "preferedPS": "",
      "unAvailableDCS": 1,
      "countOfVisits": 1,
      "qualifications": "No",
      "visitCount": "1/1",
      "sharedDCS": "No",
      "availableVisitCount": 0,
      "previouslyServedCount": 0,
      "visitIds": "4688270",
      "conflict": "No"
      },
      {
      "dcsId": 14618,
      "totalVisits": 1,
      "previouslyServed": "No",
      "preferences": "Yes",
      "prefColorFlag": 0,
      "overtimeFlag": 0,
      "dcsName": "BANKS, ALLISON",
      "preference": 0,
      "familyServingFamily": "No",
      "unAvailableVisitCount": 0,
      "preferedPS": "",
      "unAvailableDCS": 1,
      "countOfVisits": 1,
      "qualifications": "No",
      "visitCount": "1/1",
      "sharedDCS": "No",
      "availableVisitCount": 0,
      "previouslyServedCount": 0,
      "visitIds": "4688270",
      "conflict": "No"
      },
      {
      "dcsId": 14622,
      "totalVisits": 1,
      "previouslyServed": "Yes",
      "preferences": "Yes",
      "prefColorFlag": 0,
      "overtimeFlag": 0,
      "dcsName": "BANKS, LYNDA",
      "preference": 0,
      "familyServingFamily": "No",
      "unAvailableVisitCount": 0,
      "preferedPS": "",
      "unAvailableDCS": 0,
      "countOfVisits": 1,
      "qualifications": "No",
      "visitCount": "1/1",
      "sharedDCS": "No",
      "availableVisitCount": 0,
      "previouslyServedCount": 1,
      "visitIds": "4688270",
      "conflict": "No"
      },
      {
      "dcsId": 15554,
      "totalVisits": 1,
      "previouslyServed": "No",
      "preferences": "Yes",
      "prefColorFlag": 0,
      "overtimeFlag": 0,
      "dcsName": "BARRETT, SHEILA",
      "preference": 0,
      "familyServingFamily": "No",
      "unAvailableVisitCount": 0,
      "preferedPS": "",
      "unAvailableDCS": 1,
      "countOfVisits": 1,
      "qualifications": "No",
      "visitCount": "1/1",
      "sharedDCS": "No",
      "availableVisitCount": 0,
      "previouslyServedCount": 0,
      "visitIds": "4688270",
      "conflict": "No"
      },
      {
      "dcsId": 14659,
      "totalVisits": 1,
      "previouslyServed": "No",
      "preferences": "Yes",
      "prefColorFlag": 0,
      "overtimeFlag": 0,
      "dcsName": "BENHAM, PAMELA",
      "preference": 0,
      "familyServingFamily": "No",
      "unAvailableVisitCount": 0,
      "preferedPS": "",
      "unAvailableDCS": 1,
      "countOfVisits": 1,
      "qualifications": "No",
      "visitCount": "1/1",
      "sharedDCS": "No",
      "availableVisitCount": 0,
      "previouslyServedCount": 0,
      "visitIds": "4688270",
      "conflict": "No"
      }
      ]

  @Input() dcsObject: any;
  constructor(public modelService: BsModalService, public bsmodelRef: BsModalRef) { }
  public modalRef: BsModalRef;


  ngOnInit(): void {
    console.log("assigndcs component")
  }

  checkAvailability() {
    this.availabilityCheck = false;
  }
  back() {
    this.availabilityCheck = true;
  }

  dropdown() {
    $(".dashboard-nav-dropdown").toggleClass("show");
  }
  public openCriteria() {
    console.log("open criteria")

  }

  public modelHide() {
    this.bsmodelRef.hide()
  }
public openschedleTemplate(schedleTemplate:TemplateRef<any>){
  this.modalRef=this.modelService.show(schedleTemplate,
    Object.assign({}, { class: 'modal-sm scheduleCriteria modalcontent-wrapper' })
    )
}
public openMarginProtection(schedleTemplate:TemplateRef<any>){
  console.log("hiii")
  this.modalRef=this.modelService.show(schedleTemplate,
    Object.assign({}, { class: ' modalcontent-wrapper modal-dialog-centered edit-modal-content' })
    )
}
public openPaydetails(schedleTemplate:TemplateRef<any>){
  this.modalRef=this.modelService.show(schedleTemplate,
    Object.assign({}, { class: ' paydetails-container modal-dialog-centered edit-modal-content  modalcontent-wrapper' })
    )
}

  ngOnDestroy() {
    console.log('++++++++++++++++')
    console.log("NgOndestroy in assign DCS")
  }
}
