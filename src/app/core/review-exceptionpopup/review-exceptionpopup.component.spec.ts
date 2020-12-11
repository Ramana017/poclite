import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewExceptionpopupComponent } from './review-exceptionpopup.component';

describe('ReviewExceptionpopupComponent', () => {
  let component: ReviewExceptionpopupComponent;
  let fixture: ComponentFixture<ReviewExceptionpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewExceptionpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewExceptionpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
