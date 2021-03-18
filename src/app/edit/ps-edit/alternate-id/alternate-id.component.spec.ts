import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternateIdComponent } from './alternate-id.component';

describe('AlternateIdComponent', () => {
  let component: AlternateIdComponent;
  let fixture: ComponentFixture<AlternateIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlternateIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternateIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
