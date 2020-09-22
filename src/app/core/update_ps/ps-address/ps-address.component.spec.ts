import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsAddressComponent } from './ps-address.component';

describe('PsAddressComponent', () => {
  let component: PsAddressComponent;
  let fixture: ComponentFixture<PsAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
