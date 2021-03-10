import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ps-dcs-map',
  templateUrl: './ps-dcs-map.component.html',
  styleUrls: ['./ps-dcs-map.component.sass']
})
export class PsDcsMapComponent implements OnInit {
 public lat:any;
 public lng:any;
  constructor() {
    if(navigator)
    {
      navigator.geolocation.getCurrentPosition( pos => {
          this.lng = +pos.coords.longitude;
          this.lat = +pos.coords.latitude;
        });
      }
    }

public zoom=8;
  ngOnInit(): void {
  }

}
