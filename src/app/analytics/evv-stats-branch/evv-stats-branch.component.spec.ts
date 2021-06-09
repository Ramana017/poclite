import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvvStatsBranchComponent } from './evv-stats-branch.component';

describe('EvvStatsBranchComponent', () => {
  let component: EvvStatsBranchComponent;
  let fixture: ComponentFixture<EvvStatsBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvvStatsBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvvStatsBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
