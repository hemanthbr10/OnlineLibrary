package com.library.entity;

public class Email {
	private String sender;
	private String receiver;
	private String subject;
	private String msgBody;
	public String getSender() {
		return sender;
	}
	public void setSender(String sender) {
		this.sender = sender;
	}
	public String getReceiver() {
		return receiver;
	}
	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getMsgBody() {
		return msgBody;
	}
	public void setMsgBody(String msgBody) {
		this.msgBody = msgBody;
	}
	@Override
	public String toString() {
		return "Email [sender=" + sender + ", receiver=" + receiver + ", subject=" + subject + ", msgBody=" + msgBody
				+ "]";
	}
	
}
