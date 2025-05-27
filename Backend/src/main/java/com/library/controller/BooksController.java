package com.library.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.tools.JavaCompiler;
import javax.tools.ToolProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.library.entity.Books;

import com.library.entity.FileResponce;
import com.library.service.BooksService;



import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;


@CrossOrigin("http://localhost:4200/")
@RestController
public class BooksController 
{
	@Autowired
	private BooksService bookService;
	
	@GetMapping("/library/books")
	public List<Books> getAllBooks() {
		return bookService.getAllBooks();
	}
	
	@GetMapping("/library/books/{id}")
	public Optional<Books> getAllBooks(@PathVariable int id) {
		return bookService.getBookById(id);
	}
	
	@GetMapping("/library/books/search/{text}")
	public List<Books> getBookByText(@PathVariable String text) {
		return bookService.getBookByText(text);
	}
	
	@GetMapping("/library/books/checkIfExists/{text}")
	public ResponseEntity<Integer> checkIfBookExists(@PathVariable String text) {
		return new ResponseEntity<Integer>( bookService.checkIfBookExists(text),HttpStatus.OK);
	}
	
	@GetMapping("/library/books/searchAddedBefor/{days}")
	public List<Books> getBookAddedByDate(@PathVariable int days) {
		return bookService.getBookAddedByDate(days);
	}
	
	@GetMapping("/library/books/filter/{searchArray}")
	public Set<Books> filterBooks(@PathVariable String[] searchArray) {
		return bookService.filterBooks(searchArray);
	}
	
	@Value("${book.image}")
	private String path;
	
	@PutMapping("/library/book/{id}")
	public  ResponseEntity<FileResponce> putMethodName(@RequestParam("image") MultipartFile image, @PathVariable int id)
	{
		
		String fileName;
		try {
			fileName = bookService.uploadImage(path, image,id);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return new ResponseEntity<>(new FileResponce(null ,"not uploaded"),HttpStatus.OK);
		}
		
		return new ResponseEntity<>(new FileResponce(fileName ,"uploaded Sucessfully"),HttpStatus.OK);
	}
	
	@PostMapping("/library/books")
	public Books addBook(@RequestBody Books bookData) {

		return bookService.addBook(bookData);
	}
	
	@PostMapping("/library/multiplebooks")
	public String addMultipleBooks(@RequestBody List<Books> bookData) {

		return bookService.addMultipleBooks(bookData);
	}
	
	@PutMapping("/library/books")
	public String putMethodName(@RequestBody Books bookData) {
		//TODO: process PUT request
		
		return bookService.updateBook(bookData);
	}
	
	@DeleteMapping("/library/books/{id}")
	public String deleteBook(@PathVariable int id)
	{
		return bookService.deleteBook(id);
	}
	
	
}
