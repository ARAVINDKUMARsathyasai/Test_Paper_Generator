package com.testpaper.service.impl;

import java.util.Set;
import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.testpaper.model.Question;
import com.testpaper.model.Test;
import com.testpaper.repository.QuestionRepository;
import com.testpaper.service.QuestionService;

@Service
public class QuestionServiceImpl implements QuestionService {
	
	@Autowired
	private QuestionRepository questionRepo;

	@Override
	public Question addQuestion(Question question) {
		return this.questionRepo.save(question);
	}

	@Override
	public Question updateQuestion(Question question) {
		return this.questionRepo.save(question);
	}

	@Override
	public Set<Question> getQuestions() {
		return new HashSet<>(this.questionRepo.findAll());
	}

	@Override
	public Question getQuestion(Long QuestionId) {
		return this.questionRepo.findById(QuestionId).get();
	}

	@Override
	public Set<Question> getQuestionsOfTest(Test test) {
		return this.questionRepo.findByTest(test);
	}

	@Override
	public void deleteQuestion(Long quesId) {
		Question question = new Question();
		question.setQuesId(quesId);
		this.questionRepo.delete(question);
	}

	@Override
	public List<Question> getAllQuestions() {
		return questionRepo.findAll();
	}

}
