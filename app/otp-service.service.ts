import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { otp } from './otp';

@Injectable({
  providedIn: 'root'
})
export class OtpServiceService {
  clearOTP(arg0: string) {
    console.log(arg0);
    return this.httpClient.delete(`${this.baseURL}/library/deleteOTPRecord/${arg0}`)
  }
  verifyOTP(otp: otp) {
    return this.httpClient.put(`${this.baseURL}/library/verifyOTP`,otp);
  }
  sendOTP(arg0: string) {
    return this.httpClient.get(`${this.baseURL}/library/sendOTP/${arg0}`)
  }
  
  private baseURL = "http://localhost:8080";
  constructor(private httpClient:HttpClient){ }
}
