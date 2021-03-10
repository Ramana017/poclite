import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocateDcsComponent } from './locate-dcs.component';

describe('LocateDcsComponent', () => {
  let component: LocateDcsComponent;
  let fixture: ComponentFixture<LocateDcsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocateDcsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocateDcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
