import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayorPlanDetailsComponent } from './payor-plan-details.component';

describe('PayorPlanDetailsComponent', () => {
  let component: PayorPlanDetailsComponent;
  let fixture: ComponentFixture<PayorPlanDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayorPlanDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayorPlanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
