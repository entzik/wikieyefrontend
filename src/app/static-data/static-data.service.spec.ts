import { TestBed, inject } from '@angular/core/testing';

import { StaticDataService } from './static-data.service';

describe('StaticDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaticDataService]
    });
  });

  it('should ...', inject([StaticDataService], (service: StaticDataService) => {
    expect(service).toBeTruthy();
  }));
});
