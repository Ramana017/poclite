import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maintainence',
  templateUrl: './maintainence.component.html',
  styleUrls: ['./maintainence.component.sass']
})
export class MaintainenceComponent implements OnInit {

  displayArray:Array<boolean>=[true,false]
  constructor() { }

  ngOnInit(): void {
  }

}
