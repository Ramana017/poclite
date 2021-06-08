import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelephonyStatsComponent } from './telephony-stats.component';

describe('TelephonyStatsComponent', () => {
  let component: TelephonyStatsComponent;
  let fixture: ComponentFixture<TelephonyStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelephonyStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelephonyStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
