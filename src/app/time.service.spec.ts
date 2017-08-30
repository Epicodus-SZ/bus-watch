import { TestBed, inject } from '@angular/core/testing';

import { TimeService } from './time.service';

fdescribe('TimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeService]
    });
  });

  fit('should instantiate itself', inject([TimeService], (service: TimeService) => {
    expect(service).toBeTruthy();
  }));

  fit('minsToArrival testing', inject([TimeService], (service: TimeService) => {
    expect(service.minsToArrival(1234567890,1234867890)).toEqual(5);
  }));

});
