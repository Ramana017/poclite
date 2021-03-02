import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingmoduleComponent } from './schedulingmodule.component';

describe('SchedulingmoduleComponent', () => {
  let component: SchedulingmoduleComponent;
  let fixture: ComponentFixture<SchedulingmoduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingmoduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingmoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
