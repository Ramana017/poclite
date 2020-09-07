import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsdescrepancyComponent } from './gpsdescrepancy.component';

describe('GpsdescrepancyComponent', () => {
  let component: GpsdescrepancyComponent;
  let fixture: ComponentFixture<GpsdescrepancyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpsdescrepancyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpsdescrepancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
