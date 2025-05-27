package com.library.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.library.entity.Books;


public interface BookRepository extends JpaRepository<Books, Integer>{
	@Query(value ="select *from Books where name like %?1% or author like %?1% or category like %?1% or status like %?1% or language like %?1% or description like %?1% or  publisher_publisher_id IN (SELECT publisher_id FROM publisher WHERE name like %?1%)", nativeQuery = true)
	public List<Books> getBook(String input);

	@Query(value = "select * from books order by book_id desc limit 1",nativeQuery = true)
	public Books findTopByOrderByIdDesc();
	
	@Query(value = "select * from books where date_of_purchase > ?1",nativeQuery = true)
	public List<Books> getBookAddedByDays(String date);
	
	@Query(value = "select * from books where name = ?1 ",nativeQuery = true)
	public List<Books> checkIfBookExists(String text);
}
