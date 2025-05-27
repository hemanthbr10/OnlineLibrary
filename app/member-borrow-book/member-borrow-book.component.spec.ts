import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberBorrowBookComponent } from './member-borrow-book.component';

describe('MemberBorrowBookComponent', () => {
  let component: MemberBorrowBookComponent;
  let fixture: ComponentFixture<MemberBorrowBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemberBorrowBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemberBorrowBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
