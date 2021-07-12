import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenScheduledHrsComponent } from './open-scheduled-hrs.component';

describe('OpenScheduledHrsComponent', () => {
  let component: OpenScheduledHrsComponent;
  let fixture: ComponentFixture<OpenScheduledHrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenScheduledHrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenScheduledHrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
