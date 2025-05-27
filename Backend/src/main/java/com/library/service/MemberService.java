package com.library.service;

import java.util.List;
import java.util.Optional;

import com.library.entity.Login;
import com.library.entity.Member;

public interface MemberService {

	Member addMember(Member member);

	List<Member> getAllMembers();

	String updateMember(Member member);

	Member deleteMember(int id);

	String addMultipleMembers(List<Member> member);

	Optional<Member> getMemberById(int id);

	List<Member> getMemberByText(String text);

	List<Integer> getMemberBooks(int id);

	Member loginMember(Login login);

	Member checkUsernameOrEmail(String text);

	int checkUSerNameExists(String username);

}
