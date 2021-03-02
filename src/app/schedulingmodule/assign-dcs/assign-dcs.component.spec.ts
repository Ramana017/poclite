import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDCSComponent } from './assign-dcs.component';

describe('AssignDCSComponent', () => {
  let component: AssignDCSComponent;
  let fixture: ComponentFixture<AssignDCSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignDCSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignDCSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
