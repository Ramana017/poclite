import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-move-visits',
  templateUrl: './move-visits.component.html',
  styleUrls: ['./move-visits.component.sass']
})
export class MoveVisitsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  dropdown() {
    $(".dashboard-nav-dropdown").toggleClass("show");
  }
}
