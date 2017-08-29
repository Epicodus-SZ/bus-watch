import { TestBed, inject } from '@angular/core/testing';

import { ApiDataService } from './api-data.service';

describe('ApiDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiDataService]
    });
  });

  it('should ...', inject([ApiDataService], (service: ApiDataService) => {
    expect(service).toBeTruthy();
  }));
});
