package com.library.serviceImpl;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.library.entity.Books;
import com.library.entity.Login;
import com.library.entity.Member;
import com.library.entity.Member_Books;
import com.library.repository.BookRepository;
import com.library.repository.MemberRepository;
import com.library.repository.Member_BooksRepository;
import com.library.service.MemberService;
@Service
public class MemberServiceImpl implements MemberService{
	@Autowired
	private MemberRepository memberRepository;
	@Autowired
	private Member_BooksRepository orderRepo;
	@Autowired
	private BookRepository bookRepo;

	@Override
	public Member addMember(Member member) {
		member.setPenalty(0);
		memberRepository.save(member);
		
		return memberRepository.findTopByOrderByIdDesc();
	}

	@Override
	public List<Member> getAllMembers() {
		
		List<Member> members = memberRepository.findAll();
		LocalDate currentDate = LocalDate.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		String formattedStartDate = currentDate.format(formatter);
		for(Member member : members){
			double count=0;
			List<Member_Books> orders = orderRepo.getMemberPendingRecords(member.getId());
			for(Member_Books oder : orders){
				Books book = bookRepo.findById(oder.getBookId()).get();
				LocalDate currntEndDate = LocalDate.parse(oder.getEndDate());
				if(currntEndDate.isBefore(currentDate)){
					double daysBetween = ChronoUnit.DAYS.between(currentDate, currntEndDate);
					 count = count+(daysBetween*(double)book.getFine());
				}
				 
			}
			member.setPenalty(Math.abs((float)count));
			memberRepository.save(member);
			
		}
		return memberRepository.findAll();
	}

	@Override
	public String updateMember(Member member) {
		memberRepository.save(member);
		return "Member Added";
	}

	@Override
	public Member deleteMember(int id) {
		Member member = getMemberById(id).get();
		
		memberRepository.deleteById(id);
		List<Member_Books> records = orderRepo.deleteByMemberID(id);
		for(Member_Books record : records)
		{
			Books book = bookRepo.findById(record.getBookId()).get();
			book.setStatus("Avaliable");
			bookRepo.save(book);
		}
		orderRepo.deleteAll(records);
		return member;
	}

	@Override
	public String addMultipleMembers(List<Member> member) {
		memberRepository.saveAll(member);
		return "All Members Added";
	}

	@Override
	public Optional<Member> getMemberById(int id) {
		
		return memberRepository.findById(id);
	}
	
	public Member getMember(int id){
		return this.memberRepository.findById(id).get();
	}

	@Override
	public List<Member> getMemberByText(String text) {
		
		return memberRepository.getMember(text);
	}

	@Override
	public List<Integer> getMemberBooks(int id) {

		List<Integer> bookids = orderRepo.getMemberBooksId(id);
		
		return bookids;
	}

	@Override
	public Member loginMember(Login login) {
		
		return memberRepository.loginMember(login.getUsername(), login.getPassword());
	}

	@Override
	public Member checkUsernameOrEmail(String text) {
		
		return memberRepository.checkUsernameOrEmail(text);
	}

	@Override
	public int checkUSerNameExists(String username) {
		Member member = memberRepository.checkUsernameOrEmail(username);
		System.out.println(member);
		if(member==null)
		{
			return 1;
		}
		else {
			return 	0;
		}
	}
	
	
}
