import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PpivotTableComponent } from './ppivot-table.component';

describe('PpivotTableComponent', () => {
  let component: PpivotTableComponent;
  let fixture: ComponentFixture<PpivotTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PpivotTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PpivotTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
