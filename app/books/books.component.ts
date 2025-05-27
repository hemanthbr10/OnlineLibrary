import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../book.service';
import { MemberService } from '../member.service';
import { BorroService } from '../borro.service';
import { FormControl, FormGroup } from '@angular/forms';
import { books } from '../books';
import { PublisherService } from '../publisher.service';
import { publisher } from '../publisher';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit{
currentDate : Date = new Date;
date = this.currentDate.toISOString().slice(0, 10);
nameValid: any;
emptyName:boolean=true;
authorValid: boolean =false;
emptyAAuthor: boolean=true;
priceValid: boolean =false;
emptyPrice: boolean=true;
fineValid: boolean =false;
emptyFine: boolean=true;
  dateOfPurchaseValid: boolean=false;
  imageChangeValid: boolean=false;
  emptyLang: boolean=true;
  langValid: boolean=false;
  emptyRack: boolean=true;
  rackValid: boolean=false;
  emptyQuantity: boolean=true;
  quantityValid: boolean=false;
  emptyEdition: boolean=true;
  editionValid: boolean=false;
  emptyCategory: boolean=true;
  CategoryValid: boolean=false;
  publishdateValid: boolean=false;
  emptyDescrition: boolean=true;
  descriptionValid: boolean=false;
  allValid: boolean=false;

  emptyPublisher=true;
  bookFoundMsg: any;
allValid2: boolean=false;
descriptionValidation(data:any) {
  if(data!="")
  {
    this.emptyDescrition=false;
    this.descriptionValid = data.match(/^[A-Za-z\s]*$/) && data.length > 3 && data.length<500 ? true : false;
    this.allValid2=!this.descriptionValid;
  }
  this.allValidation();
}
publishdateValidation() {
this.publishdateValid=true;
this.allValid2=!this.publishdateValid;
this.allValidation();
}
categoryValidation(data:any) {
  if(data!="")
  {
    this.emptyCategory=false;
    this.CategoryValid = data.match(/^[A-Za-z\s]*$/) && data.length > 3 && data.length<50 ? true : false;
    this.allValid2=!this.CategoryValid;
  }
  this.allValidation();
}
editionValidation(data:any) {
  data = Number(data);
  this.emptyEdition=false;
  this.editionValid = data>0 && data<=20?true:false;
  this.allValid2=!this.editionValid;
  this.allValidation();
}
qantityValidation(data:any) {
  data = Number(data);
  this.emptyQuantity=false;
  this.quantityValid = data>0 && data<=10?true:false;
  this.allValid2=!this.quantityValid;
  this.allValidation();
}
rackNoValidation(data:any) {
  data = Number(data);
  this.emptyRack=false;
  this.rackValid = data>0 && data<=20?true:false;
  this.allValid2=!this.rackValid
  this.allValidation();
}
languageValidation(data:any) {
  if(data!="")
  {
    this.emptyLang=false;
    this.langValid = data.match(/^[A-Za-z\s]*$/) && data.length > 3 && data.length<20 ? true : false;
    this.allValid2=!this.langValid
  }
  this.allValidation();
}
fineValidation(data:any) {
  const obj = this.bookForm.value
  data = Number(data);
  this.emptyFine=false;
  this.fineValid = data>0 && data<=(obj.price/2)?true:false;
  this.allValid2=!this.fineValid;
  this.allValidation();
}
dopValidation() {
this.dateOfPurchaseValid=true;
this.allValid2=!this.dateOfPurchaseValid;
this.allValidation();
}
priceValidation(data:any) {
  data = Number(data);
  this.emptyPrice=false
  this.priceValid = data>0 && data<10000?true:false
  this.allValid2=!this.priceValid;
  this.allValidation();
}
authorValidation(data:any) {
  if(data!="")
  {
    this.emptyAAuthor=false;
    this.authorValid = data.match(/^[A-Za-z\s]*$/) && data.length > 3 && data.length<50 ? true : false
    this.allValid2=!this.authorValid;
  }
  this.allValidation();
}
nameValidation(ip:string) {

  this.bookService.checkIfBookExists(ip).subscribe((data)=>{this.verifyExistsResult(ip,data)})
  
}
  verifyExistsResult(ip:any,data:any) {
    if(ip!="")
  {
    console.log(ip);
    this.emptyName=false;
    this.nameValid = data==1 && ip.match(/^[A-Za-z\s]*$/) && ip.length > 3 && ip.length<50 ? true : false;
    this.bookFoundMsg = this.nameValid ? "Book Avaliable" : "Not Avaliable";
    this.allValid2=!this.nameValid;
  }
  this.allValidation();
  }
  formData = new FormData();
onFileSelected(event: any) {
  this.imageChangeValid=true;
  const file: File = event.target.files[0];
  this.formData.append('image', file);
  this.allValidation();
}

allValidation()
{
  this.allValid = this.nameValid && this.authorValid && this.priceValid && this.dateOfPurchaseValid && this.fineValid && this.imageChangeValid && this.langValid && this.rackValid && this.quantityValid && this.editionValid && this.foundMember && this.CategoryValid && this.publishdateValid && this.descriptionValid && !this.emptyName && !this.emptyAAuthor && !this.emptyPrice && !this.emptyFine && !this.emptyLang && !this.emptyRack && !this.emptyQuantity && !this.emptyEdition && !this.emptyCategory && !this.emptyDescrition ? true:false
}
clearForm() {

  this.publisherName="";
  this.book=new books(0,"","",0,0,0,0,"",new publisher("","","","",""),"",0,"","","","");
}
  publisherId: any;
updateBook(_t32: any) {
  this.book=_t32;
  this.publisherId=_t32.publisher.publisherId;
}
foundMember: boolean=false;
searchPublisher(arg0: string) {
this.publisherService.searchPublisher(arg0).subscribe((data)=>this.publisherList=data);
}
filterData(arg0:any) {
  this.emptyPublisher=false;
  this.publisher = this.publisherList.filter((publisher: { publisherId: number; }) =>
    publisher.publisherId===Number(arg0)
  );
  console.log(this.publisher)
  if(this.publisher.length>0){
    this.foundMember=true;
    this.publisherName=this.publisher[0].name;
  }
  else if(arg0==""){
    this.publisherName="";
  }
  else{
    this.foundMember=false;
    this.publisherName="Not Found";
  }
  this.allValid2=!this.foundMember;
  
}
addBook() {
  const data = this.bookForm.value;
  this.book.author=data.author;
  this.book.name=data.name;
  this.book.dateOfPurchase=data.dateOfPurchase;
  this.book.edition=data.edition;
  this.book.quantity=data.quantity;
  this.book.rackNo=data.rackNo;
  this.book.price=data.price;
  this.book.category=data.category;
  this.book.fine=data.fine;
  this.book.language=data.language;
  this.book.description=data.description;
  this.book.publishDate=data.publishDate;
  console.log(this.book);
  this.book.publisher=this.publisher[0];
  this.bookService.addBook(this.book).subscribe((data)=>{console.log(data),this.getPageData(),this.addImeageToBook(data)});
  this.bookForm.reset();
  this.publisherName="";
  this.publisher=[];
}
addImeageToBook(data:any){
  this.bookService.addImeage(data.bookId,this.formData).subscribe((data)=>{console.log(data)})
}
updateBooks() {
    const data = this.bookForm.value;
    this.book.author=data.author;
    this.book.name=data.name;
    this.book.dateOfPurchase=data.dateOfPurchase;
    this.book.edition=data.edition;
    this.book.quantity=data.quantity;
    this.book.rackNo=data.rackNo;
    this.book.price=data.price;
    this.book.category=data.category;
    this.book.fine=data.fine;
    this.book.language=data.language;
    this.book.description=data.description;
    this.book.publishDate=data.publishDate;
    console.log(this.book);
  if(this.publisher.length>0)
  {
    this.book.publisher=this.publisher[0];
  }
    this.bookService.addBook(this.book).subscribe((data)=>{console.log(data),this.getPageData()});
    this.bookForm.reset();
    this.publisherName="";
    this.publisher=[];
  
}
  @ViewChild('exampleModal') modalElement!: ElementRef;
  @ViewChild('main') main!: ElementRef;
  @ViewChild('deleteSucess') deleteSucess!: ElementRef;
cancle() {
  this.modalElement.nativeElement.style.display = 'none';
  this.main.nativeElement.style.opacity= 1;
}
delete() {
  this.bookService.deleteBook(this.bookId).subscribe((data)=>console.log(data));
  this.modalElement.nativeElement.style.display = 'none';
  this.deleteSucess.nativeElement.style.display = 'block';
  setTimeout(() => {
    // Add your logic here
    this.deleteSucess.nativeElement.style.display = 'none';
    this.main.nativeElement.style.opacity= 1; // For example, hide the element after a timeout
  }, 1000);
}
deleteBook(arg0: any) {

  this.modalElement.nativeElement.style.display = 'block';
  this.main.nativeElement.style.opacity= 0.2;
  this.bookId=arg0;
}

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
  getPageData(){
    console.log("hiii");
    
    this.bookService.getAllBooks().subscribe((data)=>{this.bookList=data});
    this.memberService.getAllMembers().subscribe((data)=>{this.memberList=data,console.log(this.memberList)});
    this.publisherService.getAllPublishers().subscribe((data)=>{this.publisherList=data,console.log(data)});
  }
  constructor(private bookService : BookService,private memberService : MemberService,private borrowService:BorroService,private publisherService : PublisherService){}
  bookList:any;
  memberList:any;
  bookId:any;
  publisherList:any=[];
  publisher:any=[];
  publisherName:string="";
  book=new books(0,"","",0,0,0,0,"",new publisher("","","","",""),"",0,"","","","");
  bookForm :FormGroup= new FormGroup({
    bookId: new FormControl(null),
    name: new FormControl(null),
    author: new FormControl(null),
    price: new FormControl(null),
    rackNo: new FormControl(null),
    quantity: new FormControl(null),
    edition: new FormControl(null),
    dateOfPurchase: new FormControl(null),
    status: new FormControl(null),
    publisher:new FormControl(null),
    category:new FormControl(null),
    fine:new FormControl(null),
    publishDate:new FormControl(null),
    language:new FormControl(null),
    description:new FormControl(null),
  });

  ngOnInit(): void {
    this.getPageData();
  }
}
