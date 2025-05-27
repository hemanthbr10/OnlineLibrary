package com.library.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.library.entity.Publisher;
import com.library.service.PublisherService;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@CrossOrigin("http://localhost:4200/")
@RestController
public class PublisherController {
	
	@Autowired
	private PublisherService publisherService;
	
	@GetMapping("/library/publisher")
	public List<Publisher> getAllPublishers() {
		return publisherService.getAllPublishers();
	}
	
	@GetMapping("/library/publisher/{id}")
	public Publisher getPublisher(@PathVariable int id) {
		return publisherService.getPublisher(id);
	}
	
	@PostMapping("/library/publisherList")
	public String addPublisherList(@RequestBody List<Publisher> publisherData) {
		//TODO: process POST request
		
		return publisherService.addPublisherList(publisherData);
	}
	
	@PostMapping("/library/publisher")
	public Publisher addPublisher(@RequestBody Publisher publisherData) {
		
		return publisherService.addPublisher(publisherData);
	}
	
	@GetMapping("/library/publisher/search/{text}")
	public List<Publisher> searchPublisher(@PathVariable String text) {
		return publisherService.searchPublisher(text);
	}
	
	@DeleteMapping("/library/publisher/{id}")
	public Publisher deletePublisher(@PathVariable int id) {
		
		return publisherService.deletePublisher(id);
	}
	
	
	
	
}
