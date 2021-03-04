import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOnHoldComponent } from './service-on-hold.component';

describe('ServiceOnHoldComponent', () => {
  let component: ServiceOnHoldComponent;
  let fixture: ComponentFixture<ServiceOnHoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceOnHoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceOnHoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
