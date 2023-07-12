package com.testpaper.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.Set;

import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.LinkedHashSet; 

@Entity
@DynamicUpdate
@Table(name="subject")
public class Subject {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="subId")
	private Long subId;
	
	@Column(name="title")
	private String title;
	
	@Column (name="discription")
	private String discription;

	@OneToMany(mappedBy="subject", fetch=FetchType.EAGER,cascade=CascadeType.ALL)
	@JsonIgnore
	private Set<Test> tests = new LinkedHashSet<>();
	
	public Subject() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Subject(Long subId, String title, String discription) {
		super();
		this.subId = subId;
		this.title = title;
		this.discription = discription;
	}

	public Subject(String title, String discription) {
		super();
		this.title = title;
		this.discription = discription;
	}

	public Long getSubId() {
		return subId;
	}

	public void setSubId(Long subId) {
		this.subId = subId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDiscription() {
		return discription;
	}

	public void setDiscription(String discription) {
		this.discription = discription;
	}

	@Override
	public String toString() {
		return "Subject [subId=" + subId + ", title=" + title + ", discription=" + discription + "]";
	}
}
