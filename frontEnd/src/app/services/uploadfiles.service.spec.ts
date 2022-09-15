import { TestBed } from '@angular/core/testing';

import { UploadfilesService } from './uploadfiles.service';

describe('UploadfilesService', () => {
  let service: UploadfilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadfilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
