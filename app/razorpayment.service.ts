import { Injectable } from '@angular/core';
import { member } from './member';
declare var Razorpay: any;
@Injectable({
  providedIn: 'root'
})
export class RazorpaymentService {

  payNow(amount:any,description:any,image:string,member:member) {
    const RozarpayOptions  = {
      description: description,
      currency: 'INR',
      amount: amount*100,
      name: 'OnlineBookRentalSystem',
      key: 'rzp_test_yYgtAwphrLEUuS',
      image: `https://s3.amazonaws.com/images.ecwid.com/images/9384897/393721192.jpg`,
      prefill: {
        name: member.name,
        email: member.contact,
        address: member.address
      },
      theme: {
        color: '##E19F1B'
      },
      modal: {
        ondismiss:  () => {
          
        }
      }
    }

    const successCallback = (paymentid: any) => {
      console.log(paymentid);
    }

    const failureCallback = (e: any) => {
      console.log(e);
    }

    Razorpay.open(RozarpayOptions,successCallback, failureCallback)
  }
}
