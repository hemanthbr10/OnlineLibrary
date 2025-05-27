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
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrl: './publisher.component.css'
})
export class PublisherComponent implements OnInit{
emailValidation(arg0: string) {
  this.emptyEmail=false;
  this.emailValid = arg0.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? true : false;
  this.allValidation();
}
yearFoundedValidation() {
this.yearFoundedValid=true;
this.allValidation();
}
founderValidation(arg0: string) {
  this.emptyFounder=false;
  this.founderValid = arg0.length>5 && arg0.length<50 ? true : false;
  this.allValidation();
}
emailValidation2(arg0: string) {
  this.emptyEmail=false;
  this.emailValid = arg0.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? true : false;
  this.allvalid2=this.emailValid;
}
yearFoundedValidation2() {
this.yearFoundedValid=true;
this.allvalid2=this.yearFoundedValid;
}
founderValidation2(arg0: string) {
  this.emptyFounder=false;
  this.founderValid = arg0.length>5 && arg0.length<50 ? true : false;
  this.allvalid2=this.founderValid;
}
allValid:boolean=false;
allvalid2:boolean=false;
allValidation(){
this.allValid = this.emailValid && this.yearFoundedValid && this.founderValid && this.nameValid && this.addressValid ? true : false;
this.allvalid2=this.allValid;
}
currentDate : Date = new Date;
date = this.currentDate.toISOString().slice(0, 10);
  nameValid: boolean=false;
  emptyName:boolean=true;
  addressValid:boolean=false;
  emptyAddress:boolean=true;
  founderValid:boolean=false;
  emptyFounder:boolean=true;
  yearFoundedValid:boolean=false;
  emailValid:boolean=false;
  emptyEmail:boolean=true;
nameValidation(arg0: string) {
  this.emptyName=false;
  this.nameValid = arg0.length>5 && arg0.length<30 ? true : false;
  this.allValidation();
}
addressValidation(arg0: string) {
  this.emptyAddress=false;
  this.addressValid = arg0.length>5 && arg0.length<50 ? true : false;
  this.allValidation();
}
nameValidation2(arg0: string) {
  this.emptyName=false;
  this.nameValid = arg0.length>5 && arg0.length<30 ? true : false;
  this.allvalid2=!this.nameValid;
}
addressValidation2(arg0: string) {
  this.emptyAddress=false;
  this.addressValid = arg0.length>5 && arg0.length<50 ? true : false;
  this.allvalid2=!this.addressValid;
}
  publisherId: any;
  clearForm() {
    this.publisher=new publisher("","","","","");
  }
   
  updateMemberData(_t32: any) {
    this.publisher=_t32;
  }
 

  addMember() {
    const data = this.publisherForm.value;
    this.publisher.name=data.name;
    this.publisher.address=data.address;
    this.publisher.founder=data.founder;
    this.publisher.yearFounded=data.yearFounded;
    this.publisher.website=data.website;
    console.log(this.publisher);
    this.publisherService.addPublisher(this.publisher).subscribe((data)=>{console.log(data),this.getPageData()});
    this.publisherForm.reset();


  }
  updateMember() {
    const data = this.publisherForm.value;

    this.publisher.name=data.name;
    this.publisher.address=data.address;
 
    console.log(this.publisher);
    this.publisherService.addPublisher(this.publisher).subscribe((data)=>{console.log(data),this.getPageData()});
    this.publisherForm.reset();

  }
    @ViewChild('exampleModal') modalElement!: ElementRef;
    @ViewChild('main') main!: ElementRef;
    @ViewChild('deleteSucess') deleteSucess!: ElementRef;
  cancle() {
    this.modalElement.nativeElement.style.display = 'none';
    this.main.nativeElement.style.opacity= 1;
  }
  delete() {
    this.publisherService.deletePublisher(this.publisherId).subscribe((data)=>{console.log(data),this.getPageData()});
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
    this.publisherId=arg0;
  }
  
    onSearchInput(vale:any) {
        
      let containsNumbers = !isNaN(Number(vale));
      if (containsNumbers) {
        this.publisherList=[];
        this.publisherService.getPublisherById(Number(vale)).subscribe((data)=>{this.publisherList.push(data)});
      } else {
        this.publisherList=[];
        this.publisherService.searchPublisher(vale).subscribe((data)=>{this.publisherList=data});
        console.log(vale);
      }
      if(vale=="")
      {
        this.getPageData();
      }
    }
    getPageData(){
      console.log("hiii");
      
 
      this.publisherService.getAllPublishers().subscribe((data)=>{this.publisherList=data,console.log(this.publisherList)});

    }
    constructor(private bookService : BookService,private memberService : MemberService,private borrowService:BorroService,private publisherService : PublisherService){}
 
    publisherList:any;

    publisher=new publisher("","","","","");
    publisherForm:FormGroup = new FormGroup({
      publisherId: new FormControl(''),
      name: new FormControl(''),
      address: new FormControl(''),
      founder:new FormControl(''),
      yearFounded:new FormControl(''),
      website:new FormControl('')
    });
  
    ngOnInit(): void {
      this.getPageData();
    }
}
