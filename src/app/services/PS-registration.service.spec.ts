import { TestBed } from '@angular/core/testing';

import { PSRegistrationService } from './PS-registarion.service';

describe('PSRegistrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PSRegistrationService = TestBed.get(PSRegistrationService);
    expect(service).toBeTruthy();
  });
});
