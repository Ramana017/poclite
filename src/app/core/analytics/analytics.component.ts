import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.sass']
})
export class AnalyticsComponent implements OnInit {
  public MangmentScreens: Array<Boolean> = [true, false, false, false];
  public parameterScreens: Array<Boolean> = [true, false, false, false,false];
  public displayFlag:boolean=false;

  measures = [];
  measures2 = [];
  measures3 = [];
  measures4 = [];
  public headerString = 'Compliance Mesaures';
  public dropdownSettings: object = {
    singleSelection: false,
    text: 'Site',
    enableSearchFilter: true,
    labelKey: 'site',
    primaryKey: 'sno',
    class: 'checkbox-list',
    showCheckbox: true,
  };
  constructor() {
    let randomStrings = ['Scheduling -Interim', 'Linking visits', 'New Admission', 'Employee onboarding', 'Reconsoliaton', 'Activity', 'Scheduling -Interim', 'Linking visits', 'New Admission', 'Employee onboarding',];
    let randomSites = ['RCHC GA AUGUSTA REG(1289)', 'RCHC GA ATHENS REG(1244)', 'RCHC GA EASTMEN REG(1244)', 'RCHC GA MACON REG(1244)', 'RCHC GA VOLDOSTA REG(1238)', 'RCHC GA ALBANY REG(1345)', 'RCHC GA COLUMBUS REG(1789)', 'RCHC GA AIKEN REG(1244)', 'RCHC GA THOMASVILLE REG(1325)', 'RCHC GA AUGUSTA REG(1500)', 'RCHC GA ATHENS REG(1244)', 'RCHC GA EASTMEN REG(1244)']
    for (let i = 1; i < 21; i++) {
      let obj = { 'sno': i, process: randomStrings[(Math.random() * 10).toFixed(0)] + i, percentage: (Math.random() * 100).toFixed(2) };
      let obj2 = { 'sno': i, site: randomSites[(Math.random() * 10).toFixed(0)], percentage: (Math.random() * 100).toFixed(2) }
      let obj3 = { 'sno': i, description: 'Some Dummy Descripton', percentage: (Math.random() * 100).toFixed(2) };
      let obj4 = { 'sno': i, description: 'Some Dummy Descripton', totals: (Math.random() * 1000).toFixed(0) };

      this.measures.push(obj);
      this.measures2.push(obj2);
      this.measures3.push(obj3);
      this.measures4.push(obj4)

    }
    console.log(this.measures)
  }

  ngOnInit(): void {
  }

  public onMeasurelevelChange(j, headerstring) {
    this.MangmentScreens = [false, false, false, false]
    this.parameterScreens = [false, false, false, false,false]

    this.MangmentScreens[j] = true;
    this.parameterScreens[j] = true;

    this.headerString = headerstring;

  }
  public templateOpen(){
    $('#templatepopup').modal({ keyboard: false, backdrop: true }, 'show')

  }

  public onDisplayChange(event){
   this.displayFlag=event.target.checked;
   this.MangmentScreens=[true,false,false,false];
   this.parameterScreens=[true,false,false,false,false];

  }
}
