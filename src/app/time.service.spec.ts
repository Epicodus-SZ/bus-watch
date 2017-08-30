import { TestBed, inject } from '@angular/core/testing';

import { TimeService } from './time.service';

fdescribe('TimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeService]
    });
  });

  fit('should ...', inject([TimeService], (service: TimeService) => {
    expect(service).toBeTruthy();
  }));
});
