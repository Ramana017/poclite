import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyEvvComponent } from './daily-evv.component';

describe('DailyEvvComponent', () => {
  let component: DailyEvvComponent;
  let fixture: ComponentFixture<DailyEvvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyEvvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyEvvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
