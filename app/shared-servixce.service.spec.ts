import { TestBed } from '@angular/core/testing';

import { SharedServixceService } from './shared-servixce.service';

describe('SharedServixceService', () => {
  let service: SharedServixceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedServixceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
