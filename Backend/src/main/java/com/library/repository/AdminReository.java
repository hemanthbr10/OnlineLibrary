package com.library.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.library.entity.Admin;
import com.library.entity.Login;

public interface AdminReository extends JpaRepository<Admin, String>{

	@Query(value = "select *from admin where email_id = ?1 and password = ?2",nativeQuery = true)
	public List<Admin> loginAdmin(String email,String Password);
}
