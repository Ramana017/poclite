import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveVisitsComponent } from './move-visits.component';

describe('MoveVisitsComponent', () => {
  let component: MoveVisitsComponent;
  let fixture: ComponentFixture<MoveVisitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveVisitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
