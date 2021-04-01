import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdmissionComponent } from './edit-admission.component';

describe('EditAdmissionComponent', () => {
  let component: EditAdmissionComponent;
  let fixture: ComponentFixture<EditAdmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAdmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
