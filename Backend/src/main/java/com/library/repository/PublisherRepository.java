package com.library.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.library.entity.Books;
import com.library.entity.Publisher;

public interface PublisherRepository extends JpaRepository< Publisher, Integer>{
	
	@Query(value ="select *from publisher where name like %?1% or address like %?1%", nativeQuery = true)
	public List<Publisher> getPublisher(String input);
	
	@Query(value = "select * from publisher order by publisher_id desc limit 1",nativeQuery = true)
	public Publisher findTopByOrderByIdDesc();
}
