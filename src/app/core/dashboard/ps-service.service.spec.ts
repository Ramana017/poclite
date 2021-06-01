import { TestBed } from '@angular/core/testing';

import { PsServiceService } from './ps-service.service';

describe('PsServiceService', () => {
  let service: PsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
