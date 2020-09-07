import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledvarianceComponent } from './scheduledvariance.component';

describe('ScheduledvarianceComponent', () => {
  let component: ScheduledvarianceComponent;
  let fixture: ComponentFixture<ScheduledvarianceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledvarianceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledvarianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
