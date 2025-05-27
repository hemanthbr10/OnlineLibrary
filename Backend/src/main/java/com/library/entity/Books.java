package com.library.entity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Books {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int bookId;
	
	@Column(length = 200)
	private String name;
	
	@Column(length = 200)
	private String author;
	
	private float price;
	
	private int rackNo;
	
	private int quantity;
	
	private int edition;
	
	@Column(length = 200)
	private String dateOfPurchase;
	
	@Column(length = 200)
	private String status;
	
	@Column(length = 200)
	private String category;
	
	private float fine; 
	
	@Column(length = 200)
	private String image;
	
	@Column(length = 200)
	private String language;
	
	@Column(length = 500)
	private String description;
	
	@Column(length = 200)
	private String publishDate;

	@ManyToOne
	private	Publisher publisher;

	public int getBookId() {
		return bookId;
	}

	public void setBookId(int bookId) {
		this.bookId = bookId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public int getRackNo() {
		return rackNo;
	}

	public void setRackNo(int rackNo) {
		this.rackNo = rackNo;
	}



	public int getEdition() {
		return edition;
	}

	public void setEdition(int edition) {
		this.edition = edition;
	}

	public String getDateOfPurchase() {
		return dateOfPurchase;
	}

	public void setDateOfPurchase(String dateOfPurchase) {
		this.dateOfPurchase = dateOfPurchase;
	}

	public Publisher getPublisher() {
		return publisher;
	}

	public void setPublisher(Publisher publisher) {
		this.publisher = publisher;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public float getFine() {
		return fine;
	}

	public void setFine(float fine) {
		this.fine = fine;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPublishDate() {
		return publishDate;
	}

	public void setPublishDate(String publishDate) {
		this.publishDate = publishDate;
	}



	@Override
	public String toString() {
		return "Books [bookId=" + bookId + ", name=" + name + ", author=" + author + ", price=" + price + ", rackNo="
				+ rackNo + ", quantity=" + quantity + ", edition=" + edition + ", dateOfPurchase=" + dateOfPurchase
				+ ", status=" + status + ", category=" + category + ", fine=" + fine + ", image=" + image
				+ ", language=" + language + ", description=" + description + ", publishDate=" + publishDate
				+ ", publisher=" + publisher + "]";
	}
	
}
