import { Component, ElementRef, ViewChild } from '@angular/core';
import { books } from '../books';
import { borrow } from '../borrow';
import { BookService } from '../book.service';
import { MemberService } from '../member.service';
import { BorroService } from '../borro.service';
import { FormControl, FormGroup } from '@angular/forms';
import { publisher } from '../publisher';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent {
  getMember1(arg0: string) {
    this.showInBorrow=true;
    this.showInReturn=false;
    this.getMember(arg0);
  }
  getMember2(arg0: string) {
    this.showInBorrow=false;
    this.showInReturn=true;
    this.getMember(arg0);
  
  }
  closeModal() {
    this.modalElement.nativeElement.style.display = 'none';
    this.main.nativeElement.style.opacity= 1;
    this.memberMsg="";
    this.bookMsg="";
    this.borrowForm.reset();
    this.getPageData();
  }
  proceedtransaction() {
    this.returnBook();
    this.memberMsg="";
    this.bookMsg="";
    this.borrowForm.reset();
    this.modalElement.nativeElement.style.display = 'none';
    this.main.nativeElement.style.opacity= 1;
  
  }
    @ViewChild('exampleModal') modalElement!: ElementRef;
    @ViewChild('main') main!: ElementRef;
  onBookIdSelect(arg0: string) {
    this.bok=Number(arg0);
    console.log(this.bok);
    
  }
  submitReturn() {
    if(this.member.penalty>0)
    {
      this.modalElement.nativeElement.style.display = 'block';
      this.main.nativeElement.style.opacity= 0.2;
    }
    else{
      this.returnBook();
      this.memberMsg="";
    this.bookMsg="";
    this.borrowForm.reset();
  
    }
  }
  returnBook(){
    this.borrowService.returnBook(this.member.id,this.bok).subscribe((data:any)=>{console.log(data);this.getPageData()},
    (error) => {
      console.error('Error:', error);
    });
  }
  submitBorrow() {
    this.order.bookId=this.book.bookId;
    this.order.memberId=this.member.id;
    this.order.startDate=this.formatedDate;
    this.order.endDate=this.returnDate;
    console.log(this.order)
    this.borrowService.addOrder(this.order).subscribe((data)=>this.checkResponce(data));
  }
  checkResponce(data:any){
    if(data=="0"){
     alert("Member already have this book");
    }
    else{
      alert("Record Added");
    }
    this.memberMsg="";
    this.bookMsg="";
    this.foundBook=false;
    this.foundMember=false;
    this.allValid=false;
    this.borrowForm.reset();
    this.getPageData();
    
  }
  getBook(arg0: string) {
    this.bookService.getBookById(Number(arg0)).subscribe((data:any)=>{this.validateBook(data),this.emptyBookInput(arg0)});
    
  }
  validateBook(book:any){
    console.log(book);
    if(book!=null){
      this.book=book;
      if(book.status=="Available"){
        this.foundBook=true;
        this.allValidation();
      }
      else{
        this.foundBook=false;
      }
      this.bookMsg=""+book.name;
    }
    else{
      this.foundBook=false
      this.bookMsg="Not Found";
      this.allValidation();
    }
  }emptyBookInput(arg0:string){
    if(arg0==""){
      this.bookMsg="";
    }
  }
  
  getMember(arg0: any) {
    this.memberService.getMemberById(Number(arg0)).subscribe((data:any)=>{this.validateMember(data),this.emptyMemberInput(arg0)});
  }
  validateMember(member:any){
    console.log(member);
    if(member!=null){   
      this.member=member;
      this.allValidd=true;
      this.getMemberBooks(member.id);
      this.penalty=member.penalty;
      if(member.penalty<=0){
        this.foundMember=true;
        this.allValidation();
        this.getMemberBooks(member.id);
      }
      else{
        this.foundMember=false;
      }
      if(this.showInBorrow){
        this.memberMsg=""+member.name;
      }
      else{
        this.memberMsg2=""+member.name;
      }
      
    }
    else{
      this.allValidd=false
      this.foundMember=false
      if(this.showInBorrow){
        this.memberMsg="Not Found";
      }
      else{
        this.memberMsg2="Not Found";
      }
      this.allValidation();
      this.memBookList=[];
    }
  }
  emptyMemberInput(arg0:string){
    if(arg0==""){
      this.memberMsg="";
      this.memberMsg2="";
      this.member=null;
    }
    
  }
  getMemberBooks(memId:number){
    this.memberService.getMemberBooks(memId).subscribe((data:any)=>{this.memBookList=data,this.chekIfMemberBooksEmpty()})
  }
  chekIfMemberBooksEmpty(){
    if(this.memBookList.length==0){
     this.allValidd=false;
    }
  }
  onDateChange(arg0: string) {
    this.returnDate=arg0;
    this.allValidation();
    
  }
  allValidation(){
  
    if(this.foundBook&&this.foundMember&&this.returnDate!=null){
      this.allValid=true;
    }
    else{
      this.allValid=false;
    }
  }
  
    showBookTable= false;
    showMemberTable= false; 
    searchBox: any;
    bookMsg: string | undefined;
    memberMsg: string | undefined;
    memberMsg2: string | undefined;
    bok:number=0;
    foundBook: boolean=false;
    foundMember: boolean=false;
    member:any;
    currentDate : Date = new Date;
    formatedDate = this.currentDate.toISOString().slice(0, 10);
    returnDate :any;
    book=new books(0,"","",0,0,0,0,"",new publisher("","","","",""),"",0,"","","","");
    order=new borrow(0,0,"","","",0);
    allValid :boolean=false;
    allValidd :boolean=false;
    penalty:number=0;
    memBookList: number[] = [];
    showInBorrow : boolean=false;
    showInReturn : boolean=false;
    onSearchInput(vale:any) {
      
      let containsNumbers = !isNaN(Number(vale));
      if (containsNumbers) {
        this.bookList=[];
        this.bookService.getBookById(Number(vale)).subscribe((data)=>{this.bookList.push(data)});
      } else {
        this.bookList=[];
        this.bookService.getBookByText(vale).subscribe((data)=>{this.bookList=data});
        console.log(vale);
      }
      if(vale=="")
      {
        this.getPageData();
      }
    }
    onSearchInput2(vale:any) {
      
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
  
  displayMemberTable() {
    this.showMemberTable= true; 
    this.showBookTable= false;
  }
  displayBookTable() {
    this.showBookTable= true;
    this.showMemberTable= false; 
   
  }
  
  getPageData(){
    console.log("hiii");
    this.bookService.getAllBooks().subscribe((data)=>{this.bookList=data});
    this.memberService.getAllMembers().subscribe((data)=>{this.memberList=data,console.log(this.memberList)});
  }
  constructor(private bookService : BookService,private memberService : MemberService,private borrowService:BorroService){}
  
    ngOnInit(): void {
    this.getPageData();
    console.log(this.formatedDate)
    this.showBookTable=true
    }
  
    title = 'LibraryManagementSystem';
    bookList: any;
    memberList:any;
    borrowForm : FormGroup = new FormGroup({
      bookID : new FormControl(0),
      memberId : new FormControl(0),
      startDate :  new FormControl(""),
      endDate :  new FormControl(""),
      status : new FormControl(""),
    })
  
}
