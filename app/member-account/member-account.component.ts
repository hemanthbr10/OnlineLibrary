import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { member } from '../member';
import { MemberService } from '../member.service';
import { BookService } from '../book.service';
import { BorroService } from '../borro.service';
import { Router } from '@angular/router';
declare var Razorpay: any;
@Component({
  selector: 'app-member-account',
  templateUrl: './member-account.component.html',
  styleUrl: './member-account.component.css'
})
export class MemberAccountComponent implements OnInit{
dismissRetuenModal() {
  this.returnBookModal.nativeElement.style.display = 'none';
}
  res: string="";
dismissPenaltyModal() {
  this.payPenaltyModal.nativeElement.style.display = 'none';
}
processCancle() {
  this.borrowService.changeOrderStatus(this.orderid,"Cancle in process").subscribe((data)=>{console.log(data)});
}
setOrder(order:any) {
  this.orderid=order.orderId;
}
payPenalty(){
  const RozarpayOptions  = {
    description: 'Penalty payemnt for order Id '+this.orderid,
    currency: 'INR',
    amount: this.member.penalty*100,
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

  verifyPaymentId() {
    if(this.res!=""){
      this.member.penalty=0;
      this.memberService.addMember(this.member).subscribe((data)=>{console.log(data)});
      this.borrowService.changeOrderStatus(this.orderid,"Return in process").subscribe((data)=>{console.log(data)});
    }
    this.payPenaltyModal.nativeElement.style.display = 'none';  
  }

processReturn() {

  this.borrowService.changeOrderStatus(this.orderid,"Return in process").subscribe((data)=>{console.log(data)});
}
  diffDays:any;
  orderid:any
  order:any
  @ViewChild('payPenaltyModal') payPenaltyModal!: ElementRef;
  @ViewChild('returnBookModal') returnBookModal!: ElementRef;
  @ViewChild('transactionCancled') transactionCancled!: ElementRef;
  calculateDaysLeft(order:any) {
    this.orderid=order.orderId;
    console.log(this.orderid);
  const diff = new Date(order.endDate).getTime()- new Date(order.startDate).getTime();
  this.diffDays = diff / (1000 * 60 * 60 * 24);
  if(this.diffDays<0){
    this.payPenaltyModal.nativeElement.style.display = 'block';
          
  }
  else{
    this.returnBookModal.nativeElement.style.display = 'block';
          
  }
}
count=7;
p= 1;

  member=new member(0,"","","",0,"","","","");
  memberForm:FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    address: new FormControl(''),
    contact: new FormControl(''),
    penalty: new FormControl('')
  });

  memberId:any;
  bookList:any;
  orderList: any=[];
  min=0;
  max=8;
  constructor(private router:Router, private memberService :MemberService,private bookService:BookService,private borrowService:BorroService){}

  getPageData(){
    
  }

  updateMember() {
    const data = this.memberForm.value;
    this.member.penalty=data.penalty;
    this.member.name=data.name;
    this.member.address=data.address;
    this.member.contact=data.contact;
    console.log(this.member);
    this.memberService.addMember(this.member).subscribe((data)=>{console.log(data),this.getPageData()});
    this.memberForm.reset();

  }
  ngOnInit(): void {
    const data = localStorage.getItem('member');
    if(data){
      this.memberId=parseInt(data);
    }
    else{
      this.router.navigate(['loginComponent']);
    }
    this.memberService.getMemberById(this.memberId).subscribe((data:any)=>{this.member=data});
    this.borrowService.getMemberRecords(this.memberId).subscribe((data)=>{this.orderList=data,console.log(data)});
  }
}
