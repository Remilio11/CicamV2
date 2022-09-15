import { TestBed } from '@angular/core/testing';

import { AermapService } from './aermap.service';

describe('AermapService', () => {
  let service: AermapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AermapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
