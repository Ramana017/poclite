import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarveltimeexceptionComponent } from './tarveltimeexception.component';

describe('TarveltimeexceptionComponent', () => {
  let component: TarveltimeexceptionComponent;
  let fixture: ComponentFixture<TarveltimeexceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarveltimeexceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarveltimeexceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
