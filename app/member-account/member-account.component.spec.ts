import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberAccountComponent } from './member-account.component';

describe('MemberAccountComponent', () => {
  let component: MemberAccountComponent;
  let fixture: ComponentFixture<MemberAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemberAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemberAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
