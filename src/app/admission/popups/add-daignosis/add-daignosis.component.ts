import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-daignosis',
  templateUrl: './add-daignosis.component.html',
  styleUrls: ['./add-daignosis.component.sass']
})
export class AddDaignosisComponent implements OnInit {
  upperBound = 10;
  lowerBound = 1;
  maxCount = 10;
  public perPage = 10;
  public diagnosisList = [
    { diagnosisCode: 'Local salmonella infect', diagnosisName: '0032' },
    { diagnosisCode: 'Oth salmonella infection', diagnosisName: '00321' },
    { diagnosisCode: 'Paratyphoid fever c', diagnosisName: '0023' },
    { diagnosisCode: 'Paratyphoid fever nos', diagnosisName: '0029' },
    { diagnosisCode: 'Salmonella enteritis', diagnosisName: '0030' },
    { diagnosisCode: 'Paratyphoid fever a', diagnosisName: '0021' },
    { diagnosisCode: 'Salmonella meningitis', diagnosisName: '00321' },
    { diagnosisCode: 'Salmonella pneumonia', diagnosisName: '003' },
    { diagnosisCode: 'Shigellosis	', diagnosisName: '004' },


  ];
  public diagnosisName: string = ''
  public pageArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  constructor(public modalService: BsModalService) { }
  bsModelref: BsModalRef;
  ngOnInit(): void {
  }

  public prevpage() {

  }
  public pagenext() {

  }
  public pagereset() {

  }

}
