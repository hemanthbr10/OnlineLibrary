import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { books } from '../books';
import { FormControl, FormGroup } from '@angular/forms';
import { member } from '../member';
import { MemberService } from '../member.service';
import { Login } from '../login';
import { Router } from '@angular/router';
import { OtpServiceService } from '../otp-service.service';
import { otp } from '../otp';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
ValidateAnswer(arg0: string) {
  if(arg0!="")
  {
    this.emptyAnswer=false;
    this.validAnswer = arg0.match(/^[A-Za-z\s]*$/) && arg0.length > 2 && arg0.length<50  ? true : false;
  }
}
emptyAnswer: boolean=true;
validAnswer: any;
verifyPassword(arg0: string) {
  if(arg0!="")
  {
    this.emptyPassword=false;
    this.passwordValid = arg0.match( /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/) ? true : false;
  }
}
emptyEmail: boolean=true;
emailValid: any;
emptyUserName: boolean=true;
userNameValid: any;
emptyPassword: boolean=true;
passwordValid: any;
verifyEmail(arg0: string) {
  this.memberService.checkUserExists(arg0).subscribe((data)=>this.verifyemailResponce(data,arg0))
}
verifyemailResponce(data:any,arg0:any)
{
  if(data==1)
  {
    this.emptyEmail=false;
    this.emailValid = arg0.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && arg0.length > 3 && arg0.length<50 ? true : false;
  }
  else{
    this.emailValid=false;
  }
}
emptyAddress: boolean=true;
addressValid: any;
verifyName(arg0: string) {
  if(arg0!="")
  {
    this.emptyName=false;
    this.nameValid = arg0.match(/^[A-Za-z\s]*$/) && arg0.length > 3 && arg0.length<50 ? true : false;
  }
}
verifyAddress(arg0: string) {
  if(arg0!="")
  {
    this.emptyAddress=false;
    this.addressValid = arg0.match(/^[A-Za-z\s]*$/) && arg0.length > 3 && arg0.length<50 ? true : false;
  }
}
checkUserNameExists(arg0: string) {
  this.memberService.checkUserExists(arg0).subscribe((data)=>this.verifyeUserNameResponce(data,arg0));
}
verifyeUserNameResponce(  data:any,arg0:any)
{
  if(data==1)
  {
    this.emptyUserName=false;
    this.userNameValid = arg0.match(/^[A-Za-z\s]*$/) && arg0.length > 3 && arg0.length<50 ? true : false;
  }
  else{
    this.userNameValid=false;
  }
}
resetMSG: any;
resetPassword() {
  const data = this.userForm.value;
  this.member.password=data.userName;
  this.memberService.addMember(this.member).subscribe((data)=>{console.log(data)});
  this.userForm.reset();
  this.reDirectToHome();
}
reDirectToHome()
{
  let minutes = 0;
  let seconds = 5;

  this.countdown = setInterval(() => {
    this.timerStarted=true;
    this.timer =  `${this.padZero(minutes)}:${this.padZero(seconds)}`;
    this.resetMSG="You will be redirected to Login page in "+this.timer;
    if (minutes === 0 && seconds === 0) {
      clearInterval(this.countdown);
      this.otpService.clearOTP(this.member.contact).subscribe((data)=>{console.log(data)});
      window.location.reload();
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
checkNewPassword(newPass:any) {
  const data = this.userForm.value;
  console.log(newPass);
  console.log(data.userName);
  this.passwordNotEnterd=false;
  if(newPass==data.userName)
  {
    this.passWordMsg="Match";
    this.newPasswordValidation=true;
  }
  else
  {
    this.passWordMsg="Not Match";
    this.newPasswordValidation=false;
  }
}

checkAnswer() {
  const data = this.userForm.value;
  if(this.member.forgetPassAns==data.userName)
  {
    this.answerIsCorrect=true;
    this.passwordNotEnterd=true;
    this.sendOTP()
  }
  else
  {
    this.answerIsCorrect=false;
  }
  this.userForm.reset();
}
checkUsernameOrEmail(text:any) {
  if(text=="")
  {
    this.msg="";
    this.notclicked=true;
  }
  else{
  this.memberService.checkUsernameOrEmail(text).subscribe((data:any)=>{this.member=data,this.addMsg(text)})
  }
}
addMsg(text:any)
{
  if(this.member!=null)
  {
    this.msg=this.member.name
    this.notclicked=false;
    this.userFound=true
  }
  else{
    this.msg="Not Found";
    this.notclicked=false;
    this.userFound=false
  }
}

msg: any;
displayForgetPassForm() {
  this.showLoginForm=false;
  this.showRegisterForm=false;
  this.showForgetPassWordForm=true;
}

loginMember() {
  
  const data = this.loginForm.value;
  this.login.username = data.username;
  this.login.password=data.password;
  console.log(this.login)
  this.memberService.loginMember(this.login).subscribe((data)=>{console.log(data),this.setMember(data)});

}
setMember(data:any){
  if(data==null)
  {
    alert("Enter Correct Details")
  }
  this.member=data;
  localStorage.setItem("member",this.member.id.toString());
  console.log(this.member.name);
  this.router.navigate(['memberLoginComponent']);
}
allValid=false;
registerUser() {
  if(this.nameValid&&this.addressValid&&this.emailValid&&this.userNameValid&&this.passwordValid&&this.validAnswer)
  {
    this.allValid=true;
    const data = this.userForm.value;
    this.sendOTPToMemberToRegister(data.contact);
  }
}
questionSelect:any;
slectQuestion(quest:any) {
this.questionSelected=true;
const data = this.userForm.value;
this.member.forgetPssQue=quest;
this.questionSelect=true;
}

displayRegisterationForm() {
  this.showForgetPassWordForm=false;
  this.showLoginForm=false;
  this.showRegisterForm=true;
}
displayLoginForm() {
  this.showForgetPassWordForm=false;
  this.showLoginForm=true;
  this.showRegisterForm=false;
}
showLoginForm: boolean=true;
showRegisterForm: boolean=false;
questionSelected: boolean=false;
userFound:boolean=false;
notclicked:boolean=true;
showForgetPassWordForm: any;
member =new member(0,"","","",0,"","","","");
login =new Login("","");
answerIsCorrect: boolean=false;
newPasswordValidation:boolean=false;
passwordNotEnterd:boolean=false;
passWordMsg:any;
questions:any=["What is your favorite color?","What is your favorite food?","What is your favorite instrument?","What is your favorite sport?","What is your school name?"];
constructor(private memberService:MemberService,private router:Router,private otpService:OtpServiceService){}
userForm :  FormGroup  = new FormGroup({
  name: new FormControl(),
  address: new FormControl(),
  contact: new FormControl(),
  userName: new FormControl(),
  password: new FormControl(),
  forgetPssQue: new FormControl(),
  forgetPassAns: new FormControl()
});
loginForm :  FormGroup  = new FormGroup({
  username: new FormControl(),
  password: new FormControl(),
});

timer: any;
@ViewChild('updatePassword') updatePassword!: ElementRef;
@ViewChild('staticBackdrop') staticBackdrop!: ElementRef;
@ViewChild('verifyAddingMemberOTP') verifyAddingMemberOTP!: ElementRef;

verifyOTP() {
  this.otpService.verifyOTP(this.otp).subscribe((data:any)=>{this.result=data,console.log(data),this.verifyData()})
}
verifyData(){
  if(this.result==1){
    this.message="Correct OTP"
    this.staticBackdrop.nativeElement.style.display = 'none';
    this.updatePassword.nativeElement.style.display = 'block';
  }
  else{
    this.message="Enter correct OTP."
  }
}
verifyOTP2() {

  this.otpService.verifyOTP(this.otp).subscribe((data:any)=>{this.result=data,console.log(data),this.verifyData2()})
}
verifyData2(){
  if(this.result==1){
    this.message="Correct OTP"
    const data = this.userForm.value;
    this.member.name=data.name;
    this.member.address=data.address;
    this.member.contact=data.contact;
    this.member.userName=data.userName;
    this.member.password=data.password;
    this.member.forgetPassAns=data.forgetPassAns;
    console.log(this.member);
    this.memberService.addMember(this.member).subscribe((data)=>{console.log(data),alert("Member Added")})
    this.reDirectToHome();
  }
  else{
    this.message="Enter correct OTP."
  }
}
addOTP(arg0: string) {
this.otp.otp=Number(arg0);
this.otp.emailId=this.member.contact;
}
newAddOTP(arg0: string) {
  this.otp.otp=Number(arg0);
  this.otp.emailId=this.email;
  }
otp = new otp("",0);
result:any;
message:string="";
timerStarted:boolean=false;
countdown :any
sendOTP(){

  this.otpService.sendOTP(this.member.contact).subscribe((data:any)=>{this.result=data,this.verifyResult(data)});
  let minutes = 2;
  let seconds = 0;

    if(!this.timerStarted){
    this.countdown = setInterval(() => {
      this.timerStarted=true;
      console.log( `${this.padZero(minutes)}:${this.padZero(seconds)}`);
      this.timer =  `${this.padZero(minutes)}:${this.padZero(seconds)}`;
      if (minutes === 0 && seconds === 0) {
        clearInterval(this.countdown);
      
        this.otpService.clearOTP(this.member.contact).subscribe((data)=>{console.log(data)});
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
email:any;
nameValid: any;
emptyName:boolean=true;
sendOTPToMemberToRegister(email:any){

  this.otpService.sendOTP(email).subscribe((data:any)=>{this.result=data,this.verifyResult(data)});
  let minutes = 2;
  let seconds = 0;
  this.email=email;
    if(!this.timerStarted){
    this.countdown = setInterval(() => {
      this.timerStarted=true;
      console.log( `${this.padZero(minutes)}:${this.padZero(seconds)}`);
      this.timer =  `${this.padZero(minutes)}:${this.padZero(seconds)}`;
      if (minutes === 0 && seconds === 0) {
        clearInterval(this.countdown);
      
        this.otpService.clearOTP(email).subscribe((data)=>{console.log(data)});
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
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event) {
    // Perform actions when the page is reloaded or refreshed
    // For example, you can save data or perform cleanup tasks
    // This code will execute when the user tries to leave the page
    this.otpService.clearOTP("akhilmalabade123@gmail.com").subscribe((data)=>{console.log(data)});
  }
}

