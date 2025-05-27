import { publisher } from "./publisher";

export class books{
  bookId:number;
	
  name:string;
	
	author:string;
	
	price:number;
	
	rackNo:number;
	
	quantity:number;
	
	edition:number;
	
	dateOfPurchase:string;
	
	status:string;

  publisher : publisher;

  category:string;

    fine:number;
    language: string;
    publishDate:string;
    description:string;

  constructor(bookId:number,
	
    name:string,
    
    author:string,
    
    price:number,
    
    rackNo:number,
    
    quantity:number,
    
    edition:number,
    
    dateOfPurchase:string,

    publisher : publisher,

    category:string,

    fine:number,

    language:string,
    
    status:string,
    publishDate:string,
    description:string,){
      this.bookId=bookId;
      this.name=name;
      this.author=author;
      this.status=status;
      this.quantity=quantity;
      this.dateOfPurchase=dateOfPurchase;
      this.edition=edition;
      this.rackNo=rackNo;
      this.price=price;
      this.publisher=publisher;
      this.category=category;
      this.fine=fine;
      this.language=language;
      this.publishDate=publishDate;
      this.description=description;
  }
}