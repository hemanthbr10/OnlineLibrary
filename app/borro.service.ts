import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { borrow } from './borrow';

@Injectable({
  providedIn: 'root'
})
export class BorroService {
  changeOrderStatus(id:any,status: any) {
    console.log(id)
    console.log(status)
    return this.httpClient.put(`${this.baseURL}/library/order/${id}/status`,status)
  }
  getMemberRecords(id: number) {
    return this.httpClient.get(`${this.baseURL}/library/order/${id}`);
  }
  returnBook(id: any, bok: number) {
   return this.httpClient.put(`${this.baseURL}/library/order/return/member/${id}/book/${bok}`,1)
  }
  addOrder(order: borrow) {
    return this.httpClient.post(`${this.baseURL}/library/order`,order);
  }
  getAllOrders(){
    return this.httpClient.get(`${this.baseURL}/library/order`);
  }
  private baseURL = "http://localhost:8080";
  

  constructor(private httpClient : HttpClient) { }

}
