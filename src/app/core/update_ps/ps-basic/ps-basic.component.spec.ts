import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsBasicComponent } from './ps-basic.component';

describe('PsBasicComponent', () => {
  let component: PsBasicComponent;
  let fixture: ComponentFixture<PsBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
