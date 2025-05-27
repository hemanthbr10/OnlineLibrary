package com.library.service;

import java.util.List;

import com.library.entity.Publisher;

public interface PublisherService {

	List<Publisher> getAllPublishers();

	String addPublisherList(List<Publisher> publisherData);

	List<Publisher> searchPublisher(String text);

	Publisher addPublisher(Publisher publisherData);

	Publisher deletePublisher(int id);

	Publisher getPublisher(int id);

}
