import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyCancelComponent } from './daily-cancel.component';

describe('DailyCancelComponent', () => {
  let component: DailyCancelComponent;
  let fixture: ComponentFixture<DailyCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
