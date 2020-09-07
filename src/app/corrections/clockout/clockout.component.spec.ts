import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockoutComponent } from './clockout.component';

describe('ClockoutComponent', () => {
  let component: ClockoutComponent;
  let fixture: ComponentFixture<ClockoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClockoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
