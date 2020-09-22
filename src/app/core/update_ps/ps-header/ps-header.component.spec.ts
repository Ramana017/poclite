import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsHeaderComponent } from './ps-header.component';

describe('PsHeaderComponent', () => {
  let component: PsHeaderComponent;
  let fixture: ComponentFixture<PsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
