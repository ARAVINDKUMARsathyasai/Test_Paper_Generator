package com.testpaper.service;

import java.util.List;
import java.util.Set;

import com.testpaper.model.Question;
import com.testpaper.model.Test;

public interface QuestionService {
	
	public Question addQuestion(Question question);
	
	public Question updateQuestion(Question question);
	
	public Set<Question> getQuestions();
	
	public Question getQuestion(Long QuestionId);
	
	public Set<Question> getQuestionsOfTest(Test test);
	
	public void deleteQuestion(Long quesId);

	public List<Question> getAllQuestions();
}
