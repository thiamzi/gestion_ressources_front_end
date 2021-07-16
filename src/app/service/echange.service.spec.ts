import { TestBed } from '@angular/core/testing';

import { EchangeService } from './echange.service';

describe('EchangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EchangeService = TestBed.get(EchangeService);
    expect(service).toBeTruthy();
  });
});
