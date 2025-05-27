import { Component, OnInit } from '@angular/core';
import { member } from '../member';
import { concatAll } from 'rxjs';
import { MemberService } from '../member.service';
import { BookService } from '../book.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-member-login',
  templateUrl: './member-login.component.html',
  styleUrl: './member-login.component.css'
})
export class MemberLoginComponent implements OnInit{
searchFound: boolean=false;
count=12;
p=1;

addSearchText(arg0: string) {
console.log(arg0)
this.search=arg0;
if(arg0!=""){
  this.bookService.getBookByText(arg0).subscribe((data)=>{this.searchBookList=data,this.searchFou()});
}
else{
  this.searchBookList=[];
  this.searchFound=false
}
}

searchFou(){
  if(this.searchBookList.length>0){
    this.searchFound=true;
  }
  else{
    this.searchFound=false;
  }
}

searchBook() {
  this.searchFound=false;
  console.log(this.search)
if(this.search!=undefined){
  this.bookService.getBookByText(this.search).subscribe((data)=>{this.bookList=data});
}
}

searchBookList: any;
search: any;

getBookAddedByDays(arg0: number) {
  this.bookService.getBookAddedByDays(arg0).subscribe((data)=>this.bookList=data);
} 

searchOnPriceRange() {
  if(this.range!=0){
    this.bookList = this.newBookList.filter((book: { price: number; }) =>
  (book.price*10)/100<=this.range
  );
  }
  else{
    this.bookList=this.newBookList;
  }
  
}
range: number=0;

  checkboxChanged(event: any) {
    if (event.target.checked) {
      this.searchArray.push(event.target.value);
    } else {
      this.searchArray = this.searchArray.filter(str => str !== event.target.value);
    }
    if(this.searchArray.length==0){
      this.bookService.getAllBooks().subscribe((data)=>{this.bookList=data});
    }
    else{
      this.bookService.filterBook(this.searchArray).subscribe((data)=>{this.bookList=data});
    }

  }
 
  
viewBook(id: number) {
  console.log(id);
  this.router.navigate(['viewBookComponent',id]);
  
}

  memberId:any;
  bookList:any;
  newBookList:any
  searchArray: string[] = [];
  constructor(private memberService :MemberService,private bookService:BookService,private activatedRoute:ActivatedRoute,private router:Router){}

  getPageData()
  {

    const data = localStorage.getItem('member');
    if(data){
      this.memberId=parseInt(data);
    }
    this.memberService.getMemberById(this.memberId).subscribe((data)=>console.log(data));
    this.bookService.getAllBooks().subscribe((data)=>{this.bookList=data,this.newBookList=data});
  }

  myAccount() {
    this.router.navigate(['myAccountComponent']);
  }
  login() {
    this.router.navigate(['loginComponent']);
  }
  logout() {
    localStorage.removeItem('member');
  window.location.reload();
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

    member:any;
    memName:any;
    memberLogin:boolean=false;
    data = localStorage.getItem('member');

    ngOnInit(): void {

      this.getPageData();
  
      if(this.data!=null){
    
        this.member= this.memberService.getMemberById( parseInt(this.data)).subscribe((data)=>{this.member=data,this.memberLogin=true,this.memName=this.member.name.split(' ')[0]});
      }
      else{
     
        this.memberLogin=false;
      }
    }  
    
  
}
