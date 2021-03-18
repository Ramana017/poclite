import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonServedComponent } from './person-served.component';

describe('PersonServedComponent', () => {
  let component: PersonServedComponent;
  let fixture: ComponentFixture<PersonServedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonServedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonServedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
