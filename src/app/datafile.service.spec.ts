import { TestBed, inject } from '@angular/core/testing';

import { DatafileService } from './datafile.service';

describe('DatafileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatafileService]
    });
  });

  it('should be created', inject([DatafileService], (service: DatafileService) => {
    expect(service).toBeTruthy();
  }));
});
