package com.library.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.library.entity.Publisher;
import com.library.repository.PublisherRepository;
import com.library.service.PublisherService;
@Service
public class PublisherServiceImpl implements PublisherService{
	
	@Autowired
	private PublisherRepository publisherRepo;
	
	@Override
	public List<Publisher> getAllPublishers() {
	
		return publisherRepo.findAll();
	}

	@Override
	public String addPublisherList(List<Publisher> publisherData) {
		publisherRepo.saveAll(publisherData);
		return "Publisher Added";
	}

	@Override
	public List<Publisher> searchPublisher(String text) {
		
		return publisherRepo.getPublisher(text);
	}

	@Override
	public Publisher addPublisher(Publisher publisherData) {
		publisherRepo.save(publisherData);
		
		return publisherRepo.findTopByOrderByIdDesc();
	}

	@Override
	public Publisher deletePublisher(int id) {
		Publisher publisher = publisherRepo.findById(id).get();
		publisherRepo.deleteById(id);
		return publisher;
	}

	@Override
	public Publisher getPublisher(int id) {
		
		return publisherRepo.findById(id).get();
	}

}
