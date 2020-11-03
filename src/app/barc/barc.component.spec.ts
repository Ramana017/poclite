import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcComponent } from './barc.component';

describe('BarcComponent', () => {
  let component: BarcComponent;
  let fixture: ComponentFixture<BarcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
