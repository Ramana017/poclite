import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDaignosisComponent } from './add-daignosis.component';

describe('AddDaignosisComponent', () => {
  let component: AddDaignosisComponent;
  let fixture: ComponentFixture<AddDaignosisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDaignosisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDaignosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
