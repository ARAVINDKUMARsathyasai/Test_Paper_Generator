package com.testpaper.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.Set;

import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.HashSet;

@Entity
@DynamicUpdate
@Table(name="test")
public class Test {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="tId")
	private Long tId;
	
	@Column(name="title")
	private String title;
	
	@Column(name="disc")
	private String disc;
	
	@Column(name="maxMarks")
	private String maxMarks;
	
	@Column(name="noOfQs")
	private String numberOFQuestions;
	
	@Column(name="active")
	private boolean active = false;
	
	@ManyToOne(fetch= FetchType.EAGER)
	private Subject subject;
	
	@OneToMany(mappedBy="test", fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	@JsonIgnore
	private Set<Question> questions = new HashSet<>();
	
	public Test(String title, String disc, String maxMarks, String numberOFQuestions, boolean active, Subject subject) {
		super();
		this.title = title;
		this.disc = disc;
		this.maxMarks = maxMarks;
		this.numberOFQuestions = numberOFQuestions;
		this.active = active;
		this.subject = subject;
	}

	public Test(Long qId, String title, String disc, String maxMarks, String numberOFQuestions, boolean active,
			Subject subject, Set<Question> questions) {
		super();
		this.tId = qId;
		this.title = title;
		this.disc = disc;
		this.maxMarks = maxMarks;
		this.numberOFQuestions = numberOFQuestions;
		this.active = active;
		this.subject = subject;
		this.questions = questions;
	}

	public Test() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getqId() {
		return tId;
	}

	public void setqId(Long qId) {
		this.tId = qId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDisc() {
		return disc;
	}

	public void setDisc(String disc) {
		this.disc = disc;
	}

	public String getMaxMarks() {
		return maxMarks;
	}

	public void setMaxMarks(String maxMarks) {
		this.maxMarks = maxMarks;
	}

	public String getNumberOFQuestions() {
		return numberOFQuestions;
	}

	public void setNumberOFQuestions(String numberOFQuestions) {
		this.numberOFQuestions = numberOFQuestions;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public Subject getSubject() {
		return subject;
	}

	public void setSubject(Subject subject) {
		this.subject = subject;
	}

	public Set<Question> getQuestions() {
		return questions;
	}

	public void setQuestions(Set<Question> questions) {
		this.questions = questions;
	}

	@Override
	public String toString() {
		return "Test [qId=" + tId + ", title=" + title + ", disc=" + disc + ", maxMarks=" + maxMarks
				+ ", numberOFQuestions=" + numberOFQuestions + ", active=" + active + ", subject=" + subject
				+ ", questions=" + questions + "]";
	}
}
