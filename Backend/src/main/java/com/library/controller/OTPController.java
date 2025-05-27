package com.library.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.library.entity.OTP;
import com.library.service.OTPService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@CrossOrigin("http://localhost:4200/")
@RestController
public class OTPController {
	
	@Autowired
	private OTPService otpService;
	
	@GetMapping("/library/sendOTP/{email}")
	public int putMethodName(@PathVariable String email) {	
		System.out.println(email);
		return otpService.sendOTP(email);
	}
	
	@PutMapping("/library/verifyOTP")
	public int putMethodName(@RequestBody OTP otp) {
	
		return otpService.verifyOTP(otp);
	}
	
	@DeleteMapping("/library/deleteOTPRecord/{email}")
	public String deleteOTPRecord(@PathVariable String email) {
		//TODO: process PUT request
		
		return otpService.deleteOTP(email);
	}
}
