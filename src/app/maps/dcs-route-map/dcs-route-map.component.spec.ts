import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcsRouteMapComponent } from './dcs-route-map.component';

describe('DcsRouteMapComponent', () => {
  let component: DcsRouteMapComponent;
  let fixture: ComponentFixture<DcsRouteMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcsRouteMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcsRouteMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
