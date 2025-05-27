package com.library.serviceImpl;

import java.time.LocalDate;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.library.entity.OTP;
import com.library.repository.OTPRepository;
import com.library.service.OTPService;
@Service
public class OTPServiceiMPL implements OTPService{
	
	@Autowired
	private OTPRepository otpRepo ;

	@Value("${spring.mail.username}") private String sender;
	
	@Autowired private JavaMailSender javaMailSender;
	
	@Override
	public int sendOTP(String email) {
		
		Boolean verify = otpRepo.existsById(email);
		if(!verify){
			Random random = new Random();
			 int randomNumber = random.nextInt(9000) + 1000;
			 try {
				 SimpleMailMessage mailMessage = new SimpleMailMessage();
				 mailMessage.setFrom(sender);
				 mailMessage.setTo(email);
				 mailMessage.setText("Your OTP is : "+randomNumber);
				 mailMessage.setSubject("OTP");
				 javaMailSender.send(mailMessage);
				}
				catch(Exception e){
					System.out.println("Error while sending mail");
				}
			 OTP otp = new OTP();
			 otp.setEmailId(email);
			 otp.setOtp(randomNumber);
			 otpRepo.save(otp);
			return 1;
		}
		else {
			return 0;
		}
		
		 
	}

	@Override
	public int verifyOTP(OTP otp) {
		OTP returnedOTP = otpRepo.findById(otp.getEmailId()).get();
		if(otp.getOtp()==returnedOTP.getOtp()){
			otpRepo.delete(returnedOTP);
			return 1;
		}
		else
		{
			return 0;
		}
	}

	@Override
	public String deleteOTP(String email) {
		otpRepo.deleteById(email);
		return "deleted";
	}
	
	
	
	
	
	
}
