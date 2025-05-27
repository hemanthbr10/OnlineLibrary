package com.library.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.library.entity.Member;
import com.library.entity.Member_Books;
import com.library.service.Member_booksService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin("http://localhost:4200/")
@RestController
public class Member_BooksController {
	@Autowired
	private Member_booksService service;
	
	@PostMapping("/library/order")
	public String postMethodName(@RequestBody Member_Books orderDate) {
		System.out.println(orderDate);
		return service.addOrder(orderDate);
	}
	
	@PutMapping("/library/order/{id}/status")
	public String changeOrderStatus(@PathVariable int id,@RequestBody String status) {
		//TODO: process PUT request
		System.out.println("Hello"+id+status);
		return service.changeOrderStatus(id,status);
	}
	
	@PutMapping("/library/order/return/member/{memid}/book/{bookid}")
	public ResponseEntity<Member> postMethodName(@PathVariable int memid,@PathVariable("bookid") int bookid,@RequestBody int id) {
		
		System.out.println(memid+" "+bookid);
		return new ResponseEntity<Member>(service.returnBook(memid,bookid),HttpStatus.CREATED);
	}
	
	@GetMapping("/library/order/pending")
	public List<Member_Books> getMethodName() {
		return service.getPendingReturn();
	}
	
	@GetMapping("/library/order")
	public List<Combined> getAllOrders() {
		return service.getAllOrders();
	}
	
	@GetMapping("/library/order/{id}")
	public List<Combined> getEmployeeOrders(@PathVariable int id) {
		return service.getEmployeeOrders(id);
	}
	
	@GetMapping("/library/sendReminderOrWarning")
	public String sendReminderOrWarning() {
		//TODO: process PUT request
		return service.sendReminderOrWarning();
	}
	
}
