export class borrow{
  id:number;
  bookId : number;
  memberId : number;
  startDate : string;
  endDate : string;
  status : string;

  constructor(
    bookId : number,
    memberId : number,
    startDate : string,
    endDate : string,
    status : string,
    id:number
  )
  {
    this.bookId=bookId;
    this.memberId=memberId;
    this.startDate=startDate;
    this.endDate=endDate;
    this.status=status
    this.id=id
  }
}