import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsDcsComponent } from './ps-dcs.component';

describe('PsDcsComponent', () => {
  let component: PsDcsComponent;
  let fixture: ComponentFixture<PsDcsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsDcsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsDcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
