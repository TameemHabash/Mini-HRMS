import { TestBed } from '@angular/core/testing';

import { SeedService } from './seed.service';

describe('SeedService', () => {
  let service: SeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
