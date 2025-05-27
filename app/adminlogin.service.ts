import { Injectable } from '@angular/core';
import { Login } from './login';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminloginService {
  sendWarningOrReminder() {
    return this.httpClient.get(`${this.baseURL}/library/sendReminderOrWarning`);
  }
  resetPass(password: any) {
    return this.httpClient.put(`${this.baseURL}/library/admin/resetPass`,password);
  }
  login(login: Login) {
    return this.httpClient.post(`${this.baseURL}/library/adminlogin`,login);
  }
  private baseURL = "http://localhost:8080";
  constructor(private httpClient:HttpClient) { }
}
