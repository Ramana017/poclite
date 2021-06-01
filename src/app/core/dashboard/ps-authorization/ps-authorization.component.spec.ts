import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsAuthorizationComponent } from './ps-authorization.component';

describe('PsAuthorizationComponent', () => {
  let component: PsAuthorizationComponent;
  let fixture: ComponentFixture<PsAuthorizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsAuthorizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
