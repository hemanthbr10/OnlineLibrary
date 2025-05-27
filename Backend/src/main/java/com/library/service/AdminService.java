package com.library.service;

import org.springframework.http.HttpStatusCode;

import com.library.entity.Login;

public interface AdminService {

	Integer adminLogin(Login loginDetails);

	Integer resetPassword(String password);

}
