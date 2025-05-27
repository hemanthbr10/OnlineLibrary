package com.library.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.library.entity.Login;
import com.library.service.AdminService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@CrossOrigin("http://localhost:4200/")
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	
	@PostMapping("library/adminlogin")
	public ResponseEntity<Integer> postMethodName(@RequestBody Login loginDetails) {
		
		return new ResponseEntity<Integer>(adminService.adminLogin(loginDetails),HttpStatus.OK);
	}
	
	@PutMapping("/library/admin/resetPass")
	public ResponseEntity<Integer> putMethodName(@RequestBody String password) {
		
		return new ResponseEntity<Integer>(adminService.resetPassword(password),HttpStatus.OK);
	}
	
}
