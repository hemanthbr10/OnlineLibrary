package com.library.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.library.entity.Books;
import com.library.entity.Member;

public interface MemberRepository extends JpaRepository< Member, Integer>{
	
	@Query(value ="select *from member where name like %?1% or address like %?1% or contact like %?1%", nativeQuery = true)
	public List<Member> getMember(String input);
	
	@Query(value = "select * from member order by id desc limit 1",nativeQuery = true)
	public Member findTopByOrderByIdDesc();
	
	@Query(value = "select * from member where user_name = ?1 and password = ?2",nativeQuery = true)
	public Member loginMember(String username,String password);
	
	@Query(value = "select * from member where user_name = ?1 or contact = ?1",nativeQuery = true)
	public Member checkUsernameOrEmail(String text);
	
	
}
