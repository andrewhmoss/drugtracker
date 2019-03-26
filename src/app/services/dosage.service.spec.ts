import { TestBed } from '@angular/core/testing';

import { DosageService } from './dosage.service';

describe('DosageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DosageService = TestBed.get(DosageService);
    expect(service).toBeTruthy();
  });
});
