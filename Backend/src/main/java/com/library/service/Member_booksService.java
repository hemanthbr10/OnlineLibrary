package com.library.service;

import java.util.List;

import com.library.controller.Combined;
import com.library.entity.Member;
import com.library.entity.Member_Books;

public interface Member_booksService {

	String addOrder(Member_Books orderDate);

	Member returnBook(int memid, int bookid);

	List<Member_Books> getPendingReturn();

	List<Combined> getAllOrders();

	List<Combined> getEmployeeOrders(int id);

	String changeOrderStatus(int id,String status);

	String sendReminderOrWarning();

}
