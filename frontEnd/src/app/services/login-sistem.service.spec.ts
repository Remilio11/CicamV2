import { TestBed } from '@angular/core/testing';

import { LoginSistemService } from './login-sistem.service';

describe('LoginSistemService', () => {
  let service: LoginSistemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginSistemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
