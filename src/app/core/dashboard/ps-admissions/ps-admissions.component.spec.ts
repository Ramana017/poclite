import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsAdmissionsComponent } from './ps-admissions.component';

describe('PsAdmissionsComponent', () => {
  let component: PsAdmissionsComponent;
  let fixture: ComponentFixture<PsAdmissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsAdmissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsAdmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
