import { TestBed } from '@angular/core/testing';

import { BorroService } from './borro.service';

describe('BorroService', () => {
  let service: BorroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BorroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
