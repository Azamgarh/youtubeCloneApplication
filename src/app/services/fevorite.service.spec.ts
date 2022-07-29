import { TestBed } from '@angular/core/testing';

import { FevoriteService } from './fevorite.service';

describe('FevoriteService', () => {
  let service: FevoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FevoriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
