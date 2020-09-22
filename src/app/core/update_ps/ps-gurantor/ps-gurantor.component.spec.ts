import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsGurantorComponent } from './ps-gurantor.component';

describe('PsGurantorComponent', () => {
  let component: PsGurantorComponent;
  let fixture: ComponentFixture<PsGurantorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsGurantorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsGurantorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
