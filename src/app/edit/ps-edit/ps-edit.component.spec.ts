import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsEditComponent } from './ps-edit.component';

describe('PsEditComponent', () => {
  let component: PsEditComponent;
  let fixture: ComponentFixture<PsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
