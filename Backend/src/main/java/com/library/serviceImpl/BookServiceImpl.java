package com.library.serviceImpl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.library.entity.Books;
import com.library.entity.Member_Books;
import com.library.entity.Publisher;
import com.library.repository.BookRepository;
import com.library.repository.Member_BooksRepository;
import com.library.service.BooksService;
@Service
public class BookServiceImpl implements BooksService{
	
	@Autowired
	private BookRepository bookRepoitory;
	
	@Autowired
	private Member_BooksRepository repository;
	
	@Override
	public List<Books> getAllBooks() {
		
		return bookRepoitory.findAll();
		
	}

	@Override
	public Books addBook(Books bookData) {
		bookData.setStatus("Available");
		Publisher publisher = bookData.getPublisher();
		bookData.setPublisher(publisher);
		 bookRepoitory.save(bookData);
		 
		 
		 return bookRepoitory.findTopByOrderByIdDesc();
	}

	@Override
	public String updateBook(Books bookData) {
		bookRepoitory.save(bookData);
		return "Updated Sucessfully";
	}

	@Override
	public String deleteBook(int id) {
		bookRepoitory.deleteById(id);
		List<Member_Books> records = repository.deleteByBookID(id);
		repository.deleteAll(records);
		return "Deleted Sucessfully";
	}

	@Override
	public Optional<Books> getBookById(int id) {
		
		return bookRepoitory.findById(id);
	}

	@Override
	public List<Books> getBookByText(String text) {
		
		return bookRepoitory.getBook(text);
	}

	@Override
	public String addMultipleBooks(List<Books> bookData) {
		bookRepoitory.saveAll(bookData);
		return "All Books Added";
	}

	@Override
	public String uploadImage(String path, MultipartFile image, int id)throws IOException {
		String name = image.getOriginalFilename();
		String extension = name.substring(name.lastIndexOf("."));
		
		if(!extension.equals(".jpg"))
		{
			System.out.println(extension);
			return "Upload Correct Document";
		}	
		//Random Name For files
		//String randomName = UUID.randomUUID().toString();
		//String newFileName = randomName.concat(name.substring(name.lastIndexOf(".")));
		String bookId = String.valueOf(id);
		String newFileName = bookId.concat(extension);
		System.out.println(newFileName);
		Books book = bookRepoitory.findById(id).get();
		book.setImage(newFileName);
		bookRepoitory.save(book);
		//repo 
		//BD File name		
		//FullPath
	
		String filePath = path + File.separator+newFileName;
		
		//Create Folder If Not Exists
		File f = new File(path);
		if(!f.exists())
		{
			f.mkdir();
		}
		
		//CopyFiles
		Files.copy(image.getInputStream(), Paths.get(filePath));
		
		//Return Saved File Name
		return name;
	
	}

	@Override
	public Set<Books> filterBooks(String[] searchArray) {
		Set<Books> books = new HashSet<Books>();
		
		for(String text : searchArray){
			books.addAll(bookRepoitory.getBook(text));
		}
		
		return books;
	}

	@Override
	public List<Books> getBookAddedByDate(int days) {
		LocalDate currentDate = LocalDate.now().minusDays(days);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		return bookRepoitory.getBookAddedByDays(formatter.format(currentDate));
	}

	@Override
	public Integer checkIfBookExists(String text) {
		// TODO Auto-generated method stub
		List<Books> books = bookRepoitory.checkIfBookExists(text);
		if(books.size()>0)
		{
			return 0;
		}
		else{
			return 1;
		}
	}

}
