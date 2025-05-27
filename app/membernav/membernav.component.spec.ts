import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembernavComponent } from './membernav.component';

describe('MembernavComponent', () => {
  let component: MembernavComponent;
  let fixture: ComponentFixture<MembernavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MembernavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MembernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
