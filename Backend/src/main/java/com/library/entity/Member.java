package com.library.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Member {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	@Column(length = 200)
	private String name;
	@Column(length = 200)
	private String address;
	@Column(length = 200)
	private String contact;
	@Column(length = 200)
	private String userName;
	@Column(length = 200)
	private String password;
	@Column(length = 200)
	private String forgetPssQue;
	@Column(length = 200)
	private String forgetPassAns;
	
	private float penalty;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public float getPenalty() {
		return penalty;
	}

	public void setPenalty(float penalty) {
		this.penalty = penalty;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getForgetPssQue() {
		return forgetPssQue;
	}

	public void setForgetPssQue(String forgetPssQue) {
		this.forgetPssQue = forgetPssQue;
	}

	public String getForgetPassAns() {
		return forgetPassAns;
	}

	public void setForgetPassAns(String forgetPassAns) {
		this.forgetPassAns = forgetPassAns;
	}

	@Override
	public String toString() {
		return "Member [id=" + id + ", name=" + name + ", address=" + address + ", contact=" + contact + ", userName="
				+ userName + ", password=" + password + ", forgetPssQue=" + forgetPssQue + ", forgetPassAns="
				+ forgetPassAns + ", penalty=" + penalty + "]";
	}
	
}
