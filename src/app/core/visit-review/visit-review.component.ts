import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-visit-review',
  templateUrl: './visit-review.component.html',
  styleUrls: ['./visit-review.component.sass']
})
export class VisitReviewComponent implements OnInit {
  public tableData:any=[]

  constructor() { }

  ngOnInit(): void {
  }
  filtermenu(){
    $(".filter-menu").toggleClass("show");
  }
}
