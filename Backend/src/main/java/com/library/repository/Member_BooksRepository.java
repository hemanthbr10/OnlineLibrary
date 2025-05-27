package com.library.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.library.entity.Member_Books;

public interface Member_BooksRepository extends JpaRepository<Member_Books, Integer>{
	
	@Query(value ="select *from Member_Books where book_id = ?2 and member_id = ?1 and status = 'Pending'", nativeQuery = true)
	public Member_Books getBook(int memid,int bookid);
	
	@Query(value ="select *from Member_Books where book_id = ?2 and member_id = ?1 and status = 'Pending'", nativeQuery = true)
	public List<Member_Books> getBooks(int memid,int bookid);
	
	@Query(value ="select *from Member_Books where member_id = ?1 and status = 'Pending'", nativeQuery = true)
	public List<Member_Books> getMemberPendingRecords(int memid);
	
	@Query(value ="select *from Member_Books where book_id = ?1 and status = 'Pending'", nativeQuery = true)
	public List<Member_Books> getlistOfBorrowers(int bookid);
	
	@Query(value ="select *from Member_Books where book_id = ?1", nativeQuery = true)
	public List<Member_Books> deleteByBookID(int bookid);
	
	@Query(value ="select *from Member_Books where member_id = ?1", nativeQuery = true)
	public List<Member_Books> deleteByMemberID(int memberid);
	
	@Query(value ="select book_id from Member_Books where member_id =?1 and status = 'Pending'", nativeQuery = true)
	public List<Integer> getMemberBooksId(int memberID);
	
	
	
	List<Member_Books> findByStatus(String status);
}
