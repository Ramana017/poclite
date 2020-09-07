import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionheaderComponent } from './correctionheader.component';

describe('CorrectionheaderComponent', () => {
  let component: CorrectionheaderComponent;
  let fixture: ComponentFixture<CorrectionheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrectionheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectionheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
