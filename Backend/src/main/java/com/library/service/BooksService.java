package com.library.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.library.entity.Books;

public interface BooksService {

	List<Books> getAllBooks();

	Books addBook(Books bookData);

	String updateBook(Books bookData);

	String deleteBook(int id);

	Optional<Books> getBookById(int id);

	List<Books> getBookByText(String text);

	String addMultipleBooks(List<Books> bookData);

	String uploadImage(String path, MultipartFile image, int id)throws IOException;

	Set<Books> filterBooks(String[] searchArray);

	List<Books> getBookAddedByDate(int days);

	Integer checkIfBookExists(String text);
	

}
