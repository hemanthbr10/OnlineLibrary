package com.library.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.library.entity.Books;
import com.library.entity.Login;
import com.library.entity.Member;
import com.library.service.MemberService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;


@CrossOrigin("http://localhost:4200/")
@RestController
public class MemberController {
	
	@Autowired
	private MemberService memberService;
	
	@GetMapping("/library/member")
	public List<Member> getMethodName() {
		return memberService.getAllMembers();
	}
	
	@GetMapping("/library/member/{id}")
	public Optional<Member> getMemberById(@PathVariable int id) {
		return memberService.getMemberById(id);
	}
	
	@GetMapping("/library/member/books/{id}")
	public List<Integer> getMemberBooks(@PathVariable int id) {
		return memberService.getMemberBooks(id);
	}
	
	@GetMapping("/library/searchmember/{text}")
	public List<Member> getMemberByText(@PathVariable String text) {
		return memberService.getMemberByText(text);
	}
	
	@GetMapping("/library/checkUsernameOrEmail/{text}")
	public Member checkUsernameOrEmail(@PathVariable String text) {
		return memberService.checkUsernameOrEmail(text);
	}
	
	@GetMapping("/library/checkuserexists/{username}")
	public int checkUSerNameExists(@PathVariable String username)
	{
		return memberService.checkUSerNameExists(username);
	}
	
	@PutMapping("/library/member/login")
	public Member putMethodName(@RequestBody Login login) {
		
		return memberService.loginMember(login);
	}
	
	@PostMapping("/library/member")
	public Member addMember(@RequestBody Member member) {		
		return memberService.addMember(member);
	}
	
	@PostMapping("/library/multiplemembers")
	public String addMultipleMembers(@RequestBody List<Member> member) {		
		return memberService.addMultipleMembers(member);
	}
	
	@PutMapping("/library/member")
	public String updateMember(@RequestBody Member member) {
		return memberService.updateMember(member);
	}
	
	@DeleteMapping("/library/member/{id}")
	public Member deleteMember(@PathVariable int id) {
		return memberService.deleteMember(id);
	}
	
	
}
