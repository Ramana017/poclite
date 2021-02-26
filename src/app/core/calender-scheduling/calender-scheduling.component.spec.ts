import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderSchedulingComponent } from './calender-scheduling.component';

describe('CalenderSchedulingComponent', () => {
  let component: CalenderSchedulingComponent;
  let fixture: ComponentFixture<CalenderSchedulingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalenderSchedulingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
