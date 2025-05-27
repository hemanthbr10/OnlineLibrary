import { Component } from '@angular/core';
import { ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../book.service';
import { MemberService } from '../member.service';
import { BorroService } from '../borro.service';
import { FormControl, FormGroup } from '@angular/forms';
import { books } from '../books';
import { PublisherService } from '../publisher.service';
import { publisher } from '../publisher';
import { member } from '../member';
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrl: './members.component.css'
})
export class MembersComponent implements OnInit{
  allValid: boolean=true;
allValid2: boolean=true;
contactValidation(arg0: string) {
  this.emptyContact=false;
  this.contactValid = arg0.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? true : false;
  this.allValid2=!this.contactValid;
}
addressValidation(arg0: string) {
  this.emptyAddress=false;
  this.addressValid =arg0.match(/^[A-Za-z\s]*$/) && arg0.length>5 && arg0.length<50 ? true : false;
  this.allValid2=!this.addressValid;
}
  nameValid: boolean=false;
  emptyName:boolean=true;
  addressValid:boolean=false;
  emptyAddress:boolean=true;
  contactValid:boolean=false;
  emptyContact:boolean=true;

nameValidation(data:any) {
  this.emptyName=false;
  this.nameValid =data.match(/^[A-Za-z\s]*$/) && data.length>5 && data.length<50 ? true : false;
  this.allValid2=!this.nameValid;
}
allValidation()
{
  this.allValid = this.nameValid && this.addressValid && this.contactValid
}
  memberId: any;
  clearForm() {
    this.member=new member(0,"","","",0,"","","","");
  }
   
  updateMemberData(_t32: any) {
    this.member=_t32;
  }
 

  addMember() {
    const data = this.memberForm.value;
    this.member.name=data.name;
    this.member.address=data.address;
    this.member.contact=data.contact;
    
    console.log(this.member);
    this.memberService.addMember(this.member).subscribe((data)=>{console.log(data),this.getPageData()});
    this.memberForm.reset();
  }
  
  userForm :  FormGroup  = new FormGroup({
    name: new FormControl(),
    address: new FormControl(),
    contact: new FormControl(),
    userName: new FormControl(),
    password: new FormControl(),
    forgetPssQue: new FormControl(),
    forgetPassAns: new FormControl()
  });
  updateMember() {
    const data = this.memberForm.value;
    this.member.penalty=data.penalty;
    this.member.name=data.name;
    this.member.address=data.address;
    console.log(this.member);
    this.memberService.addMember(this.member).subscribe((data)=>{console.log(data),this.getPageData()});
    this.memberForm.reset();

  }
    @ViewChild('exampleModal') modalElement!: ElementRef;
    @ViewChild('main') main!: ElementRef;
    @ViewChild('deleteSucess') deleteSucess!: ElementRef;
  cancle() {
    this.modalElement.nativeElement.style.display = 'none';
    this.main.nativeElement.style.opacity= 1;
  }
  delete() {
    this.memberService.deleteMemberById(this.memberId).subscribe((data)=>{console.log(data),this.getPageData()});
    this.modalElement.nativeElement.style.display = 'none';
    this.deleteSucess.nativeElement.style.display = 'block';
    setTimeout(() => {
      // Add your logic here
      this.deleteSucess.nativeElement.style.display = 'none';
      this.main.nativeElement.style.opacity= 1; // For example, hide the element after a timeout
    }, 1000);
  }
  deleteMember(arg0: any) {
  
    this.modalElement.nativeElement.style.display = 'block';
    this.main.nativeElement.style.opacity= 0.2;
    this.memberId=arg0;
  }
  
    onSearchInput(vale:any) {
        
      let containsNumbers = !isNaN(Number(vale));
      if (containsNumbers) {
        this.memberList=[];
        this.memberService.getMemberById(Number(vale)).subscribe((data)=>{this.memberList.push(data)});
      } else {
        this.memberList=[];
        this.memberService.getMemberByText(vale).subscribe((data)=>{this.memberList=data});
        console.log(vale);
      }
      if(vale=="")
      {
        this.getPageData();
      }
    }
    getPageData(){
      console.log("hiii");
      
 
      this.memberService.getAllMembers().subscribe((data)=>{this.memberList=data,console.log(this.memberList)});

    }
    constructor(private bookService : BookService,private memberService : MemberService,private borrowService:BorroService,private publisherService : PublisherService){}
 
    memberList:any;
    bookId:any;
    member=new member(0,"","","",0,"","","","");
    memberForm:FormGroup = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      address: new FormControl(''),
      contact: new FormControl(''),
      penalty: new FormControl('')
    });
  
    ngOnInit(): void {
      this.getPageData();
    }
}
