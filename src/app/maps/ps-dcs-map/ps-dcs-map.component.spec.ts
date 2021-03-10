import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsDcsMapComponent } from './ps-dcs-map.component';

describe('PsDcsMapComponent', () => {
  let component: PsDcsMapComponent;
  let fixture: ComponentFixture<PsDcsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsDcsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsDcsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
