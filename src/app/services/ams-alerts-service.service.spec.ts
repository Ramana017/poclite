import { TestBed } from '@angular/core/testing';

import { AmsAlertsServiceService } from './ams-alerts-service.service';

describe('AmsAlertsServiceService', () => {
  let service: AmsAlertsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmsAlertsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
