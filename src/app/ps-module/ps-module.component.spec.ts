import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsModuleComponent } from './ps-module.component';

describe('PsModuleComponent', () => {
  let component: PsModuleComponent;
  let fixture: ComponentFixture<PsModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
