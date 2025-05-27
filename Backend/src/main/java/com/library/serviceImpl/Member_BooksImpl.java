package com.library.serviceImpl;


import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.hibernate.sql.ast.tree.expression.Collation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.library.controller.Combined;
import com.library.entity.Books;
import com.library.entity.Member;
import com.library.entity.Member_Books;
import com.library.repository.Member_BooksRepository;
import com.library.service.BooksService;
import com.library.service.MemberService;
import com.library.service.Member_booksService;
@Service
public class Member_BooksImpl implements Member_booksService{
	@Autowired
	private Member_BooksRepository repository;
	
	@Autowired
	private BooksService bookService;
	
	@Autowired
	private MemberServiceImpl memberService;
	
	@Autowired private JavaMailSender javaMailSender;
	 
    @Value("${spring.mail.username}") 
    private String sender;
    
	@Override
	public String addOrder(Member_Books orderDate) {
		Books book = bookService.getBookById(orderDate.getBookId()).get();
		Member member = memberService.getMemberById(orderDate.getMemberId()).get();
		if(repository.getlistOfBorrowers(orderDate.getBookId()).size() < book.getQuantity())
		{
			List<Member_Books> memmberBook = repository.getBooks(orderDate.getMemberId(),orderDate.getBookId());
			if(memmberBook.size()>0){
				return "0";
			}
			orderDate.setStatus("Order in process");
			orderDate.setSentWarning("false");
			orderDate.setSentReminder("false");
			repository.save(orderDate);
			if(repository.getlistOfBorrowers(orderDate.getBookId()).size() == book.getQuantity())
			{
				book.setStatus("Not Avaliable");
				bookService.updateBook(book);
				
			}
			try {
				 SimpleMailMessage mailMessage = new SimpleMailMessage();
				 mailMessage.setFrom(sender);
				 mailMessage.setTo(member.getContact());
				 mailMessage.setText("You have sucessfully borrowed book : "+book.getName()+"\n"+"Borrow Date : "+orderDate.getStartDate()+"\n"+"Return Date : "+orderDate.getEndDate()+"\n"+"Please return book on time");
				 mailMessage.setSubject("Borrowd "+book.getName());
				 javaMailSender.send(mailMessage);
				}
				catch(Exception e){
					System.out.println("Error while sending mail");
				}
			return "1";
		}
		else
		{
			return "0";
		}
		
	}


	@Override
	public Member returnBook(int memid, int bookid) {
		System.out.println(memid+" "+bookid);
		Member_Books orderData = repository.getBook(memid, bookid);
		System.out.println(orderData);
		orderData.setStatus("Returned");
		repository.save(orderData);
		Books book = bookService.getBookById(bookid).get();
		book.setStatus("Available");
		bookService.updateBook(book);
		com.library.entity.Member member = memberService.getMember(memid);
		member.setPenalty(0);
		memberService.updateMember(member);
		return member;
	}


	@Override
	public List<Member_Books> getPendingReturn() {
		List<Member_Books> records = repository.findByStatus("Pending");
		LocalDate currentDate = LocalDate.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		List<Member_Books> returnList = new ArrayList<Member_Books>();
		for(Member_Books record : records)
		{
			LocalDate endDate = LocalDate.parse(record.getEndDate());
			if(currentDate.isAfter(endDate))
			{
				returnList.add(record);
			}
		}
		
		return returnList;
	}


	@Override
	public List<Combined> getAllOrders() {
		List<Member_Books> records = repository.findAll();
		List<Combined> returnList = new ArrayList<Combined>();
		for(Member_Books record :records){
			Books book = bookService.getBookById(record.getBookId()).orElse(null);
			Member member = memberService.getMemberById(record.getMemberId()).orElse(null);
			if(book==null||member==null){
				continue;
			}
			Combined combined = new Combined();
			combined.setOrderId(record.getId());
			combined.setBookId(book.getBookId());
			combined.setBookName(book.getName());
			combined.setPrice(book.getPrice());
			combined.setMemberName(member.getName());
			combined.setMemberId(member.getId());
			combined.setContact(member.getContact());
			combined.setStartDate(record.getStartDate());
			combined.setEndDate(record.getEndDate());
			combined.setStatus(record.getStatus());
			if(LocalDate.parse(record.getEndDate()).isBefore(LocalDate.now())&&record.getStatus().equals("Pending")){
				combined.setColor(-1);
			}
			else if(LocalDate.parse(record.getEndDate()).isBefore(LocalDate.now())&&record.getStatus().equals("Returned")){
				combined.setColor(1);
			}
			if(LocalDate.now().isBefore(LocalDate.parse(record.getEndDate()))){
				System.out.println("hii");
				if(record.getStatus().equals("Returned")){
					System.out.println(record);
					combined.setColor(1);
				}
				else {
					combined.setColor(0);
				}
			}
			
			returnList.add(combined);
		
		}
		Collections.reverse(returnList);
		return  returnList;
	}


	@Override
	public List<Combined> getEmployeeOrders(int id) {
		List<Member_Books> records = repository.deleteByMemberID(id);
		List<Combined> returnList = new ArrayList<Combined>();
		for(Member_Books record :records){
			Books book = bookService.getBookById(record.getBookId()).orElse(null);
			Member member = memberService.getMemberById(record.getMemberId()).orElse(null);
			if(book==null||member==null){
				continue;
			}
			Combined combined = new Combined();
			combined.setOrderId(record.getId());
			combined.setBookId(book.getBookId());
			combined.setBookName(book.getName());
			combined.setPrice(book.getPrice());
			combined.setMemberName(member.getName());
			combined.setMemberId(member.getId());
			combined.setContact(member.getContact());
			combined.setStartDate(record.getStartDate());
			combined.setEndDate(record.getEndDate());
			combined.setStatus(record.getStatus());
			if(LocalDate.parse(record.getEndDate()).isBefore(LocalDate.now())&&record.getStatus().equals("Pending")){
				combined.setColor(-1);
			}
			else if(LocalDate.parse(record.getEndDate()).isBefore(LocalDate.now())&&record.getStatus().equals("Returned")){
				combined.setColor(1);
			}
			if(LocalDate.now().isBefore(LocalDate.parse(record.getEndDate()))){
				
				if(record.getStatus().equals("Returned")){
					System.out.println(record);
					combined.setColor(1);
				}
				else {
					combined.setColor(0);
				}
			}
			
			returnList.add(combined);
		
		}
		Collections.reverse(returnList);
		return  returnList;
	}


	@Override
	public String changeOrderStatus(int id,String status) {
		
		Member_Books record = repository.findById(id).get();
		Member member = memberService.getMemberById(record.getMemberId()).get();
		Books book = bookService.getBookById(record.getBookId()).get();
		record.setStatus(status);
		repository.save(record);
		switch (status) {
		case "Out for Delivery":
			try {
				 SimpleMailMessage mailMessage = new SimpleMailMessage();
				 mailMessage.setFrom(sender);
				 mailMessage.setTo(member.getContact());
				 mailMessage.setText("Your order of : "+book.getName()+" is out for delivery, You should receive your order by 10 pm.");
				 mailMessage.setSubject("Out for Delivery");
				 javaMailSender.send(mailMessage);
				}
				catch(Exception e){
					System.out.println("Error while sending mail");
				}
				break;
				
		case "Pending":
			try {
				 SimpleMailMessage mailMessage = new SimpleMailMessage();
				 mailMessage.setFrom(sender);
				 mailMessage.setTo(member.getContact());
				 mailMessage.setText("Your order of : "+book.getName()+" is sucessfully deliverd."+"\n"+"Date : "+LocalDate.now());
				 mailMessage.setSubject("Deliverd "+book.getName());
				 javaMailSender.send(mailMessage);
				}
				catch(Exception e){
					System.out.println("Error while sending mail");
				}
				break;
		
		case "Returned":
			try {
				 SimpleMailMessage mailMessage = new SimpleMailMessage();
				 mailMessage.setFrom(sender);
				 mailMessage.setTo(member.getContact());
				 mailMessage.setText("Sucessfully returned : "+book.getName()+"\n"+"Date : "+LocalDate.now());
				 mailMessage.setSubject("Returned "+book.getName());
				 javaMailSender.send(mailMessage);
				}
				catch(Exception e){
					System.out.println("Error while sending mail");
				}
				break;
		
		case "Return in process":
			try {
				 SimpleMailMessage mailMessage = new SimpleMailMessage();
				 mailMessage.setFrom(sender);
				 mailMessage.setTo(member.getContact());
				 mailMessage.setText("Your request for returning book : "+book.getName()+" is in process"+"\n"+"Our delivery person will collect book from you by 10pm today"+"\n"+"Date : "+LocalDate.now());
				 mailMessage.setSubject("Return in process");
				 javaMailSender.send(mailMessage);
				}
				catch(Exception e){
					System.out.println("Error while sending mail");
				}
				break;
				
		case "Cancle in process":
			try {
				 SimpleMailMessage mailMessage = new SimpleMailMessage();
				 mailMessage.setFrom(sender);
				 mailMessage.setTo(member.getContact());
				 mailMessage.setText("Your request for canceling order of : "+book.getName()+" is in process"+"\n"+"We will notify you once we process your request."+"\n"+"Date : "+LocalDate.now());
				 mailMessage.setSubject("Order cancelation in process");
				 javaMailSender.send(mailMessage);
				}
				catch(Exception e){
					System.out.println("Error while sending mail");
				}
				break;
				
		case "Order Cancled":
			try {
				 SimpleMailMessage mailMessage = new SimpleMailMessage();
				 mailMessage.setFrom(sender);
				 mailMessage.setTo(member.getContact());
				 mailMessage.setText("Your order of : "+book.getName()+" is cancled."+"\n"+"You will receive refund in your bank account in 2-3 business days."+"\n"+"Date : "+LocalDate.now());
				 mailMessage.setSubject("Order of "+book.getName()+" is cancled.");
				 javaMailSender.send(mailMessage);
				}
				catch(Exception e){
					System.out.println("Error while sending mail");
				}
				break;
		}
		return "Updated";
	}


	@Override
	public String sendReminderOrWarning() {
		List<Member_Books> records = repository.findAll();
		for(Member_Books record :records){
			Books book = bookService.getBookById(record.getBookId()).orElse(null);
			Member member = memberService.getMemberById(record.getMemberId()).orElse(null);
			LocalDate currentDate = LocalDate.now();
			LocalDate endDate = LocalDate.parse(record.getEndDate());
			if(currentDate.isEqual(endDate) && record.getSentReminder().equals("false")){
				try {
					 SimpleMailMessage mailMessage = new SimpleMailMessage();
					 mailMessage.setFrom(sender);
					 mailMessage.setTo(member.getContact());
					 mailMessage.setText("Today is your last day to return "+book.getName()+"\n"+"If you failed to return book by 10 pm then you have to pay penalty of ₹"+book.getFine()+" per day."+"\n"+"Date : "+LocalDate.now());
					 mailMessage.setSubject("Reminder to retun book.");
					 javaMailSender.send(mailMessage);
					}
					catch(Exception e){
						System.out.println("Error while sending mail");
					}
				record.setSentReminder("true");
				repository.save(record);
			}
			else if(currentDate.isAfter(endDate)&&record.getSentWarning().equals("false")){
				try {
					 SimpleMailMessage mailMessage = new SimpleMailMessage();
					 mailMessage.setFrom(sender);
					 mailMessage.setTo(member.getContact());
					 mailMessage.setText("Return date for "+book.getName()+" is excessed you have to retun this book today."+"You have penalty of ₹ "+member.getPenalty()+"\n"+"If you failed to return book by 10 pm then your penalty will increase ₹"+book.getFine()+" per day."+"\n"+"If you fail to return book in 5 days you will not get any refund of deposite amount"+"\n"+"Date : "+LocalDate.now());
					 mailMessage.setSubject("Pending of returning book "+book.getName());
					 javaMailSender.send(mailMessage);
					}
					catch(Exception e){
						System.out.println("Error while sending mail");
					}
				record.setSentWarning("true");
				repository.save(record);
			}
		}
		return "sent";
	}
}
