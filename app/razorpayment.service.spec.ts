import { TestBed } from '@angular/core/testing';

import { RazorpaymentService } from './razorpayment.service';

describe('RazorpaymentService', () => {
  let service: RazorpaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RazorpaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
