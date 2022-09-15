import { TestBed } from '@angular/core/testing';

import { ChgFileMetService } from './chg-file-met.service';

describe('ChgFileMetService', () => {
  let service: ChgFileMetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChgFileMetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
