import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { books } from '../books';
import { publisher } from '../publisher';
import { MemberService } from '../member.service';
import { RazorpaymentService } from '../razorpayment.service';
import { borrow } from '../borrow';
import { BorroService } from '../borro.service';
declare var Razorpay: any;
@Component({
  selector: 'app-member-borrow-book',
  templateUrl: './member-borrow-book.component.html',
  styleUrl: './member-borrow-book.component.css'
})
export class MemberBorrowBookComponent implements OnInit{
count= 5;
p= 1
validateBook() {
  this.bookService.getBookById(this.book.bookId).subscribe((data)=>{this.book=data,this.validateDetails()});
}
  formatedDate: any;
rent: number=0;
total:number=0
dateValidation:boolean=true;
calculateRent(date:any) {
  console.log(date);
this.rent=(date*this.book.price)/100;
this.total=this.rent+this.book.price
this.dateValidation=true;
this.order.endDate=date;
}
  res: any="Akhil";

cancle() {
  this.router.navigate(['memberLoginComponent']);
}


  constructor(private router :Router,private actRoute:ActivatedRoute,private bookService:BookService,private memberService:MemberService,private payment:RazorpaymentService,private orderService:BorroService){}
  id:any;
  memberId:any;
  memberLoggedin:boolean=false;
  book:any;
  member:any;
  order=new borrow(0,0,"","","",0);
  searchArray: string[] = [];
  bookList:any;
  getPageData(){
    this.bookService.getBookById(this.id).subscribe((data:any)=>{this.book=data,this.getSimilarBooks()});
    this.memberService.getMemberById(this.memberId).subscribe((data)=>this.member=data);

  }
  getSimilarBooks(){
    this.searchArray.push(this.book.name);
    this.searchArray.push(this.book.category);
    this.searchArray.push(this.book.author),
    this.searchArray.push(this.book.publisher.name);
    this.bookService.filterBook(this.searchArray).subscribe((data)=>{this.bookList=data,this.removeObjectById()});
  }
  removeObjectById() {
    this.bookList = this.bookList.filter((book: { bookId: number; }) =>
    book.bookId!=this.book.bookId
  );
}
  viewBook(id:any){
    this.router.navigate(['viewBookComponent',id]);
    window.location.reload();
  }

  @ViewChild('pendingBooksMsg') pendingBooksMsg!: ElementRef;
  @ViewChild('transactionCancled') transactionCancled!: ElementRef;
  @ViewChild('bookNotAvaliable') bookNotAvaliable!: ElementRef;


  validateDetails()
  {

  if(this.book.status!="Available"){
  this.bookNotAvaliable.nativeElement.style.display = 'block';
          setTimeout(() => {
            this.bookNotAvaliable.nativeElement.style.display = 'none';
          }, 2000);
 
  }
  else if(this.rent!=0){

    if(this.memberLoggedin){
      if(this.dateValidation){
        if(this.member.penalty<=0){
          this.payNow();
        }
        else{
          this.pendingBooksMsg.nativeElement.style.display = 'block';
          setTimeout(() => {
            this.pendingBooksMsg.nativeElement.style.display = 'none';
          }, 2000);
        }
      }
    }
      else{
        this.router.navigate(['loginComponent']);
      }
    }
    else{
      this.dateValidation=false;
    }  
  }
  

  ngOnInit(): void {
    const currentDate : Date = new Date;
    this.formatedDate = currentDate.toISOString().slice(0, 10);
   this.id=this.actRoute.snapshot.params['id'];
   const data = localStorage.getItem('member');
    if(data){
      this.memberId=parseInt(data);
      this.memberLoggedin=true;
    } 
    this.getPageData();
  }
 log:boolean=false;
 
  //RazorPaymentGateway

  payNow() {
   

      const RozarpayOptions  = {
      description: this.book.name,
      currency: 'INR',
      amount: this.total*100,
      name: 'OnlineBookRentalSystem',
      key: 'rzp_test_yYgtAwphrLEUuS',
      handler: async (response: any) => {
        console.log(response);
        this.res=response.razorpay_payment_id;
          this.verifyPaymentId();
      
      },
      image: `https://s3.amazonaws.com/images.ecwid.com/images/9384897/393721192.jpg`,
      prefill: {
        name: this.member.name,
        email: this.member.contact,
        address: this.member.address
      },
      theme: {
        color: '##E19F1B'
      },
      modal: {
        ondismiss:  () => {
          this.transactionCancled.nativeElement.style.display = 'block';
          setTimeout(() => {
            this.transactionCancled.nativeElement.style.display = 'none';
          }, 2000);
        }
      }
    }
    Razorpay.open(RozarpayOptions)
  }

  verifyPaymentId(){
    
     this.order.bookId=this.book.bookId;
     this.order.memberId=this.memberId;
     this.order.startDate=this.formatedDate;
     console.log(this.order)
     this.orderService.addOrder(this.order).subscribe((data)=>{console.log("Sucess")})
   

  }
  
}
