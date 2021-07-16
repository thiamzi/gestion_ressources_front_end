import { TestBed } from '@angular/core/testing';

import { ChefServiceService } from './chef-service.service';

describe('ChefServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChefServiceService = TestBed.get(ChefServiceService);
    expect(service).toBeTruthy();
  });
});
