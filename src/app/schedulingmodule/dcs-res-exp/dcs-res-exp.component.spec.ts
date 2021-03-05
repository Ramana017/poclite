import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcsResExpComponent } from './dcs-res-exp.component';

describe('DcsResExpComponent', () => {
  let component: DcsResExpComponent;
  let fixture: ComponentFixture<DcsResExpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcsResExpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcsResExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
