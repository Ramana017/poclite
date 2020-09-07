import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockInAndOutComponent } from './clock-in-and-out.component';

describe('ClockInAndOutComponent', () => {
  let component: ClockInAndOutComponent;
  let fixture: ComponentFixture<ClockInAndOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClockInAndOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockInAndOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
