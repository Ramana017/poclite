import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitAttributesComponent } from './visit-attributes.component';

describe('VisitAttributesComponent', () => {
  let component: VisitAttributesComponent;
  let fixture: ComponentFixture<VisitAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
