import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelCodeComponent } from './cancel-code.component';

describe('CancelCodeComponent', () => {
  let component: CancelCodeComponent;
  let fixture: ComponentFixture<CancelCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
