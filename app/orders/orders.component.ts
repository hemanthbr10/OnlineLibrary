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
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
getReturnInProcess() {
  this.orderList=[];
  this.orderList = this.newOrderList.filter((order: { status: string; }) =>
  order.status=="Return in process"
  );
}
getPacked() {
  this.orderList=[];
  this.orderList = this.newOrderList.filter((order: { status: string; }) =>
  order.status=="Packed"
  );
}
getShipped() {
  this.orderList=[];
  this.orderList = this.newOrderList.filter((order: { status: string; }) =>
  order.status=="Shipped"
  );
}
getCancleInProcess() {
  this.orderList=[];
  this.orderList = this.newOrderList.filter((order: { status: string; }) =>
  order.status=="Cancle in process"
  );
}
updateOrderStatus(arg0: string,order:any) {
console.log(arg0);
console.log(order)
order.status=arg0;
this.borrowService.changeOrderStatus(order.orderId,arg0).subscribe((data)=>{console.log(data)})
console.log(order)
}
getPending() {
  this.orderList=[];
  this.orderList = this.newOrderList.filter((order: { status: string; }) =>
  order.status=="Pending"
  );
}
getReturned() {
  this.orderList=[];
        this.orderList = this.newOrderList.filter((order: { status: string; }) =>
        order.status=="Returned"
        );
}
getOrderInProcess() {
  this.orderList=[];
        this.orderList = this.newOrderList.filter((order: { status: string; }) =>
        order.status=="Order in process"
        );
}
  publisherId: any;
  selectedRadio: string="";
  clearForm() {
    this.publisher=new publisher("","","","","");
  }
   
  updateMemberData(_t32: any) {
    this.publisher=_t32;
  }
   
    onSearchInput(vale:any) {
 
      let containsNumbers = !isNaN(Number(vale));
      if (containsNumbers) {
        this.orderList=[];
        this.orderList = this.newOrderList.filter((order: { bookId: number; }) =>
        order.bookId===Number(vale)
        );
        if(this.orderList.length<=0)
        {
          this.orderList =  this.newOrderList.filter((order: { memberId: number; }) =>
          order.memberId===Number(vale)
          );
        }
      } else {
        this.orderList=[];
        if(this.selectedRadio!=""){
          this.orderList = this.newOrderList.filter((order: { bookName: string,status:string }) =>
        order.bookName.toLowerCase().includes(vale)&&order.status==this.selectedRadio
        );
        if(this.orderList.length<=0)
        {
          this.orderList =  this.newOrderList.filter((order: { memberName: string,status:string }) =>
          order.memberName.toLowerCase().includes(vale)&&order.status==this.selectedRadio
          );
        }
        }
        this.orderList = this.newOrderList.filter((order: { bookName: string; }) =>
        order.bookName.toLowerCase().includes(vale)
        );
        if(this.orderList.length<=0)
        {
          this.orderList =  this.newOrderList.filter((order: { memberName: string; }) =>
          order.memberName.toLowerCase().includes(vale)
          );
        }
        
      }
      if(vale=="")
      {
        this.getPageData();
      }
    }

    getPageData(){
      console.log("hiii");
      this.publisherService.getAllPublishers().subscribe((data)=>{this.publisherList=data,console.log(this.publisherList)});
      this.bookService.getAllBooks().subscribe((data)=>{this.bookList=data});
      this.memberService.getAllMembers().subscribe((data)=>{this.memberList=data,console.log(this.memberList)});
      this.borrowService.getAllOrders().subscribe((data)=>{this.orderList=data,console.log(data),this.newOrderList=data});
     
    }
    createCombinedTable(){

    }
    constructor(private bookService : BookService,private memberService : MemberService,private borrowService:BorroService,private publisherService : PublisherService){}
 
    publisherList:any;
    bookList:any;
    memberList:any;
    orderList:any
    newOrderList:any;
    publisher=new publisher("","","","","");
    publisherForm:FormGroup = new FormGroup({
      publisherId: new FormControl(''),
      name: new FormControl(''),
      address: new FormControl(''),
    });
  
    ngOnInit(): void {
      this.getPageData();
    }
}
