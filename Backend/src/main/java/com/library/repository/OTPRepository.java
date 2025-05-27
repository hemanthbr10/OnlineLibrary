package com.library.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.library.entity.OTP;

public interface OTPRepository extends JpaRepository<OTP, String>{
	
	@Query(value = "select *from otp where emailId = ?1 and otp = ?2",nativeQuery = true)
	public OTP verifyOTP(String email,int otp);
}
