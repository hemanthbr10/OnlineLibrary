import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-membernav',
  templateUrl: './membernav.component.html',
  styleUrl: './membernav.component.css'
})
export class MembernavComponent implements OnInit{
myAccount() {
  this.router.navigate(['myAccountComponent']);
}
login() {
  this.router.navigate(['loginComponent']);
}
logout() {
  localStorage.removeItem('member');
  this.router.navigate(['loginComponent']);
}
  goTologinComponent() {
    this.router.navigate(['loginComponent']);
  }
  goToOrderComponent() {
    this.router.navigate(['oderComponent']);
  }
  goToPublisherComponent() {
    this.router.navigate(['publisherComponent']);
  }
  goToMemberComponent() {
    this.router.navigate(['memberComponent']);
  }
  goToHomeComponent() {
    this.router.navigate(['memberLoginComponent']);
  }
  goToBooksComponent() {
  this.router.navigate(['bookComponent']);
  }
  constructor(private router:Router,private memberService:MemberService){}
  member:any;
  memberLogin:boolean=false;
  data = localStorage.getItem('member');
  memName:any;
  ngOnInit(): void {


    if(this.data!=null){
  
      this.member= this.memberService.getMemberById( parseInt(this.data)).subscribe((data)=>{this.member=data,this.memberLogin=true,this.memName=this.member.name.split(' ')[0]});
    }
    else{
   
      this.memberLogin=false;
    }
  }
  
}
