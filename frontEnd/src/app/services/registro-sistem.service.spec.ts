import { TestBed } from '@angular/core/testing';

import { RegistroSistemService } from './registro-sistem.service';

describe('RegistroSistemService', () => {
  let service: RegistroSistemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroSistemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
