import { Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { OtpServiceService } from '../otp-service.service';
import { otp } from '../otp';
import { concatAll, interval, Subscription, timeout } from 'rxjs';
import { AdminloginService } from '../adminlogin.service';
import { Login } from '../login';
import { Route, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnDestroy{
resetPassword() {
this.adminLogin.resetPass(this.password).subscribe((data)=>{console.log(data),this.verifyResetPassword(data)});
}
verifyResetPassword(data:any)
{
  if(data==1)
  {
alert("Password Reset Sucessfully.")
  }
  else{
    alert("Error reseting password.")
  }
}
@ViewChild('updatePassword') updatePassword!: ElementRef;
  loginResponce: any;
loginAdmin() {
  const login = new Login(this.email,this.password)
  console.log(login);
  this.adminLogin.login(login).subscribe((data)=>{this.loginResponce=data,console.log(data),this.checkLogin()})
}
  checkLogin() {
    if(this.loginResponce==1)
    {
      this.adminLogin.sendWarningOrReminder().subscribe((data)=>console.log(data))
      this.router.navigate(['adminHomeComponent']);
    }
    else{
      alert("Invalid username or password!")
    }
  }
setEmail(arg0: string) {
this.email=arg0;
}
setPassWord(arg0: string) {
this.password=arg0;
}
timer: any;
OTPVeridied:boolean=false;
verifyOTP() {
  this.otpService.verifyOTP(this.otp).subscribe((data:any)=>{this.result=data,console.log(data),this.verify()})
}
  verify() {
    this.OTPVeridied=true;
  }

addOTP(arg0: string) {
this.otp.otp=Number(arg0);
}
otp = new otp("akhilmalabade123@gmail.com",0);
result:any;
message:string="";
onPgeLoadd : Subscription | undefined;
timerStarted:boolean=false;
countdown :any;
email:any;
password:any;
startInterval = interval(1000);
sendOTP(){

  this.otpService.sendOTP("akhilmalabade123@gmail.com").subscribe((data:any)=>{this.result=data,this.verifyResult(data)});
  let minutes = 2;
  let seconds = 0;

    if(!this.timerStarted){
    this.countdown = setInterval(() => {
      this.timerStarted=true;
      console.log( `${this.padZero(minutes)}:${this.padZero(seconds)}`);
      this.timer =  `${this.padZero(minutes)}:${this.padZero(seconds)}`;
      if (minutes === 0 && seconds === 0) {
        clearInterval(this.countdown);
      
        this.otpService.clearOTP("akhilmalabade123@gmail.com").subscribe((data)=>{console.log(data)});
      } else {
        if (seconds === 0) {
          minutes--;
          seconds = 59;
        } else {
          seconds--;
        }
      }
    }, 1000); 
  }
}
setInterval(data:any){
  if(data!=0){

  let minutes = 5;
    let seconds = 0;

    const countdown = setInterval(() => {
      console.log( `${this.padZero(minutes)}:${this.padZero(seconds)}`);

      if (minutes === 0 && seconds === 0) {
        clearInterval(countdown);
      } else {
        if (seconds === 0) {
          minutes--;
          seconds = 59;
        } else {
          seconds--;
        }
      }
    }, 1000); 
  }
  }
    
  padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}
verifyResult(data:number){
  if(this.result==0){
    this.message="Already send OTP."
  }
  else{
    this.message="OTP send sucessfully."
  }
}
constructor(private otpService:OtpServiceService,private adminLogin : AdminloginService,private router : Router){}
  ngOnDestroy(): void {
    this.otpService.clearOTP("akhilmalabade123@gmail.com").subscribe((data)=>{console.log(data)});
  }
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event) {
    // Perform actions when the page is reloaded or refreshed
    // For example, you can save data or perform cleanup tasks
    // This code will execute when the user tries to leave the page
    this.otpService.clearOTP("akhilmalabade123@gmail.com").subscribe((data)=>{console.log(data)});
  }
  passwordForm = new FormGroup({
    password:new FormControl('')
  })
  newPasswordValidation:boolean=false;
passwordNotEnterd:boolean=false;
passWordMsg:any;
  checkNewPassword(newPass:any) {
    const data = this.passwordForm.value;
    this.passwordNotEnterd=false;
    if(newPass==data.password)
    {
      this.passWordMsg="Match";
      this.newPasswordValidation=true;
      this.password=newPass;
    }
    else
    {
      this.passWordMsg="Not Match";
      this.newPasswordValidation=false;
    }
  }
}
