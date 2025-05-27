package com.library.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;

import com.library.entity.Admin;
import com.library.entity.Login;
import com.library.repository.AdminReository;
import com.library.service.AdminService;
@Service
public class AdminServiceImpl implements AdminService{
	
	@Autowired
	private AdminReository adminRepo;

	@Override
	public Integer adminLogin(Login loginDetails) {
		// TODO Auto-generated method stub
		System.out.println(loginDetails);
		List<Admin> adminList = adminRepo.loginAdmin(loginDetails.getUsername(), loginDetails.getPassword());
		System.out.println(adminList);
		if (adminList.isEmpty()) {
			return 0;
		}
		else {
			return 1;
		}
	}

	@Override
	public Integer resetPassword(String password) {
		Admin admin = adminRepo.findById("akhilmalabade123@gmail.com").get();
		admin.setPassword(password);
		adminRepo.save(admin);
		return 1;
	}
		
}
