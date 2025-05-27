package com.library.controller;

public class Combined {
	private int orderId;
	private int bookId;
	private String BookName;
	private float price;
	private int memberId;
	private String MemberName;
	private String contact;
	private String StartDate;
	private String EndDate;
	private String Status;
	private int color;
	public int getOrderId() {
		return orderId;
	}
	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public String getBookName() {
		return BookName;
	}
	public void setBookName(String bookName) {
		BookName = bookName;
	}
	public String getMemberName() {
		return MemberName;
	}
	public void setMemberName(String memberName) {
		MemberName = memberName;
	}
	public String getStartDate() {
		return StartDate;
	}
	public void setStartDate(String startDate) {
		StartDate = startDate;
	}
	public String getEndDate() {
		return EndDate;
	}
	public void setEndDate(String endDate) {
		EndDate = endDate;
	}
	public String getStatus() {
		return Status;
	}
	public void setStatus(String status) {
		Status = status;
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
	public int getColor() {
		return color;
	}
	public void setColor(int color) {
		this.color = color;
	}
	@Override
	public String toString() {
		return "Combined [orderId=" + orderId + ", bookId=" + bookId + ", BookName=" + BookName + ", price=" + price
				+ ", memberId=" + memberId + ", MemberName=" + MemberName + ", contact=" + contact + ", StartDate="
				+ StartDate + ", EndDate=" + EndDate + ", Status=" + Status + ", color=" + color + "]";
	}
	
}
