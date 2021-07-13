import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CalculatedField, FieldList, IDataOptions, IDataSet, PivotView } from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
PivotView.Inject(FieldList, CalculatedField);


@Component({
  selector: 'app-ppivot-table',
  templateUrl: './ppivot-table.component.html',
  styleUrls: ['./ppivot-table.component.sass']
})
export class PpivotTableComponent implements OnInit {

  constructor(private http: HttpClient) { }
  public RawData = [];
  public dataSourceSettings: IDataOptions;
  public gridSettings: GridSettings;
  getPivotData(): IDataSet[] {
    console.log("hello")
    let pivotData: IDataSet[] = this.RawData;
    return pivotData;

  }

  ngOnInit(): void {
    this.http.get('assets/evvcaregiver.json').subscribe(res => {
      let data: any = res;
      this.RawData = data.telephonyByCaregiver;
      console.log(this.RawData[0]);
      this.sample2();


    }
    )

  }

  public sample() {
    this.gridSettings = {
      columnWidth: 140
    } as GridSettings;
    this.dataSourceSettings = {
      enableSorting: true,
      columns: [{ name: 'complianceStatus'}],
      values: [{ name: 'complianceStatus', caption: 'complianceStatus' }],
      dataSource: this.RawData  ,
      rows: [{ name: 'branch',caption:'Branch' }],
      expandAll: false,
      filters: [],
      // showRowGrandTotals:false,
      // showColumnGrandTotals:false,
      // showGrandTotals:false,

    };
  }
  public sample2() {
    this.gridSettings = {
      columnWidth: 140
    } as GridSettings;
    this.dataSourceSettings = {
      enableSorting: true,
      columns: [],
      values: [{ name: 'manualPunches'},{ name: 'telephonyLandlinePunches'},{ name: 'telephonyAppPunches#'}],
      dataSource: this.RawData  ,
      rows: [{ name: 'branch',caption:'Branch' },{name:'dcsCoordinator'}],
      expandAll: false,
      filters: [],
      calculatedFieldSettings:[
      {name:"manualPunches",formula:'"(manualPunches)"/"(totalPunches)"*100'},
      {name:"telephonyLandlinePunches",formula:'"(telephonyLandlinePunches)"/"(totalPunches)"*100'},{name:"telephonyAppPunches#",formula:'"(telephonyAppPunches#)"/"(totalPunches)"*100'}]
      // showRowGrandTotals:false,
      // showColumnGrandTotals:false,
      // showGrandTotals:false,


    }
  }
}