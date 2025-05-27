package com.library.service;

import com.library.entity.OTP;

public interface OTPService {

	int sendOTP(String email);

	int verifyOTP(OTP otp);

	String deleteOTP(String email);

}
