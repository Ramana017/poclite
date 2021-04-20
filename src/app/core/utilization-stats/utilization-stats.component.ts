import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-utilization-stats',
  templateUrl: './utilization-stats.component.html',
  styleUrls: ['./utilization-stats.component.sass']
})
export class UtilizationStatsComponent implements OnInit {
public utilizationData:Array<any>=[1,2,3,4,5,4,5,4,5,4,54,54];
  constructor() { }

  ngOnInit(): void {
  }










  //filter Related variables and functionality.

  public jobRunDate:Date=new Date();
  public rvpList=[];
  public edsList=[];
  public selectedBranches=[];
  public SelectedSites=[];


  public getRVPList(){

  }
}
