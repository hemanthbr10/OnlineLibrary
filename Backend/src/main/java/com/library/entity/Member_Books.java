package com.library.entity;

import org.springframework.boot.context.properties.bind.DefaultValue;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Member_Books {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private int bookId;
	private int memberId;
	@Column(length = 200)
	private String startDate;
	@Column(length = 200)
	private String endDate;
	@Column(length = 200)
	private String status;
	@Column(length = 200)
	private String sentReminder;
	@Column(length = 200)
	private String sentWarning;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getBookId() {
		return bookId;
	}
	public void setBookId(int bookId) {
		this.bookId = bookId;
	}
	public int getMemberId() {
		return memberId;
	}
	public void setMemberId(int memberId) {
		this.memberId = memberId;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getSentReminder() {
		return sentReminder;
	}
	public void setSentReminder(String sentReminder) {
		this.sentReminder = sentReminder;
	}
	public String getSentWarning() {
		return sentWarning;
	}
	public void setSentWarning(String sentWarning) {
		this.sentWarning = sentWarning;
	}
	@Override
	public String toString() {
		return "Member_Books [id=" + id + ", bookId=" + bookId + ", memberId=" + memberId + ", startDate=" + startDate
				+ ", endDate=" + endDate + ", status=" + status + ", sentReminder=" + sentReminder + ", sentWarning="
				+ sentWarning + "]";
	}
	
}
