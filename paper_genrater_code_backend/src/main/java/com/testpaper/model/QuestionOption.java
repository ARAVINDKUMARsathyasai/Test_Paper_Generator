package com.testpaper.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class QuestionOption {

    private Long questionId;
    private String selectedOption;

    // getters and setters

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public String getSelectedOption() {
        return selectedOption;
    }

    public void setSelectedOption(String selectedOption) {
        this.selectedOption = selectedOption;
    }
}
