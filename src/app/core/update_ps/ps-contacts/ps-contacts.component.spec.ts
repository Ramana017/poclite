import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsContactsComponent } from './ps-contacts.component';

describe('PsContactsComponent', () => {
  let component: PsContactsComponent;
  let fixture: ComponentFixture<PsContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
