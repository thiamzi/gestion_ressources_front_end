import { TestBed } from '@angular/core/testing';

import { BasedonnesService } from './basedonnes.service';

describe('BasedonnesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasedonnesService = TestBed.get(BasedonnesService);
    expect(service).toBeTruthy();
  });
});
