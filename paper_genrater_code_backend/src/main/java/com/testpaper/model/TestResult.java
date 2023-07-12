package com.testpaper.model;

import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.DynamicUpdate;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@DynamicUpdate
@Table(name = "test_results")
public class TestResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long testId;
    
    private Long userId;

    private int correctAnswers;
    private int wrongAnswers;
    private int unansweredQuestions;

    @ElementCollection
    private Set<QuestionOption> selectedOptions = new HashSet<>();


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTestId() {
        return testId;
    }

    public void setTestId(Long testId) {
        this.testId = testId;
    }

    public int getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(int correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public int getWrongAnswers() {
        return wrongAnswers;
    }

    public void setWrongAnswers(int wrongAnswers) {
        this.wrongAnswers = wrongAnswers;
    }

    public int getUnansweredQuestions() {
        return unansweredQuestions;
    }

    public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public void setUnansweredQuestions(int unansweredQuestions) {
        this.unansweredQuestions = unansweredQuestions;
    }

    public Set<QuestionOption> getSelectedOptions() {
        return selectedOptions;
    }

    public void setSelectedOptions(Set<QuestionOption> selectedOptions) {
        this.selectedOptions = selectedOptions;
    }

	@Override
	public String toString() {
		return "TestResult [id=" + id + ", testId=" + testId + ", userId=" + userId + ", correctAnswers="
				+ correctAnswers + ", wrongAnswers=" + wrongAnswers + ", unansweredQuestions=" + unansweredQuestions
				+ ", selectedOptions=" + selectedOptions + "]";
	}
}