import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GurantorComponent } from './gurantor.component';

describe('GurantorComponent', () => {
  let component: GurantorComponent;
  let fixture: ComponentFixture<GurantorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GurantorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GurantorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
