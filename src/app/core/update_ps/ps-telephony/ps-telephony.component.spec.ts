import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsTelephonyComponent } from './ps-telephony.component';

describe('PsTelephonyComponent', () => {
  let component: PsTelephonyComponent;
  let fixture: ComponentFixture<PsTelephonyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsTelephonyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsTelephonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
