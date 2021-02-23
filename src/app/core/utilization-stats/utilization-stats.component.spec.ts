import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizationStatsComponent } from './utilization-stats.component';

describe('UtilizationStatsComponent', () => {
  let component: UtilizationStatsComponent;
  let fixture: ComponentFixture<UtilizationStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilizationStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizationStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
