import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { member } from './member';
import { Login } from './login';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  checkUserExists(arg0: string) {
    return this.httpClient.get(`${this.baseURL}/library/checkuserexists/${arg0}`);
  }
  checkUsernameOrEmail(text: any) {
    return this.httpClient.get(`${this.baseURL}/library/checkUsernameOrEmail/${text}`)
  }
  loginMember(login: Login) {
    return this.httpClient.put(`${this.baseURL}/library/member/login`,login);
  }
  deleteMemberById(memberId: any) {
    return this.httpClient.delete(`${this.baseURL}/library/member/${memberId}`)
  }
  addMember(member: member) {
   return this.httpClient.post(`${this.baseURL}/library/member`,member);
  }
  getMemberBooks(memId: number) {
    return this.httpClient.get(`${this.baseURL}/library/member/books/${memId}`)
  }
  getMemberByText(vale: any) {
    return this.httpClient.get(`${this.baseURL}/library/searchmember/${vale}`)
  }
  getMemberById(arg0: number) {
   return this.httpClient.get(`${this.baseURL}/library/member/${arg0}`)
  }
  getAllMembers() {
    return this.httpClient.get(`${this.baseURL}/library/member`)
  }

  private baseURL = "http://localhost:8080";

  constructor(private httpClient : HttpClient) { }

}
