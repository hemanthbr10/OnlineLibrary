export class member{
  id:number;
	
	name:string;
	
	address:string;
	
	contact:string;

  userName:string;

  password:string;

  forgetPssQue:string;

  forgetPassAns:string;
	
	penalty:number;

  constructor(

  id:number,
	name:string,
	address:string,
	contact:string,
	penalty:number,
  userName:string,
  password:string,
  forgetPssQue:string,
  forgetPassAns:string

  ){
    this.id=id;
    this.name=name;
    this.address=address;
    this.contact=contact;
    this.penalty=penalty;
    this.userName=userName;
    this.password=password;
    this.forgetPassAns=forgetPassAns;
    this.forgetPssQue=forgetPssQue;
  }
}