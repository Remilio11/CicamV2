import { TestBed } from '@angular/core/testing';

import { AermodService } from './aermod.service';

describe('AermodService', () => {
  let service: AermodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AermodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
