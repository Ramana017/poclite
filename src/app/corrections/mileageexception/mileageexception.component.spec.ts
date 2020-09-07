import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MileageexceptionComponent } from './mileageexception.component';

describe('MileageexceptionComponent', () => {
  let component: MileageexceptionComponent;
  let fixture: ComponentFixture<MileageexceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MileageexceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MileageexceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
