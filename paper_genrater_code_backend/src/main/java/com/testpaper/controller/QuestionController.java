package com.testpaper.controller;

import java.util.Set;
import java.util.stream.Collectors;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.testpaper.model.Question;
import com.testpaper.model.QuestionOption;
import com.testpaper.service.QuestionService;
import com.testpaper.service.TestResultService;
import com.testpaper.service.TestService;
import com.testpaper.model.Test;
import com.testpaper.model.TestResult;
import com.testpaper.repository.QuestionRepository;

@RestController
@RequestMapping("/question")
@CrossOrigin("http://localhost:3000/")
public class QuestionController {

	@Autowired
	private QuestionService questionService;
	
	@Autowired
	private QuestionRepository qessRepo;
	
	@Autowired
	private TestService testService;
	
	@Autowired
    private TestResultService testResultService;
	
	//add question
	@PostMapping("/")
	public ResponseEntity<Question> addQuestion(@RequestBody Question question){
		return ResponseEntity.ok(this.questionService.addQuestion(question));
	}
	
	//update question data
	@PutMapping("/")
	public ResponseEntity<Question> updateQuestion(@RequestBody Question question){
		return ResponseEntity.ok(this.questionService.updateQuestion(question));
	}
	
	@GetMapping("/")
    public ResponseEntity<List<Question>> getAllQuestions() {
        List<Question> allQuestions = this.questionService.getAllQuestions();
        return ResponseEntity.ok(allQuestions);
    }
	
	//Fetch requried number of questions randomly from the database
	@GetMapping("/test/{tId}/{userId}")
	public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("tId") Long tId, @PathVariable("userId") Long userId) {
	    Test test = this.testService.getTest(tId);
	    Set<Question> allQuestions = test.getQuestions();

	    // Get the questions already generated for the specific user and test
	    List<TestResult> userTestResults = testResultService.getTestResultsByUserIdAndTestId(userId, tId);
	    Set<Long> generatedQuestionIds = new HashSet<>();
	    for (TestResult testResult : userTestResults) {
	        generatedQuestionIds.addAll(testResult.getSelectedOptions().stream()
	                .map(QuestionOption::getQuestionId)
	                .collect(Collectors.toList()));
	    }

	    // Filter out already generated questions from all questions
	    Set<Question> availableQuestions = allQuestions.stream()
	            .filter(question -> !generatedQuestionIds.contains(question.getQuesId()))
	            .collect(Collectors.toSet());

	    List<Question> randomQuestions = new ArrayList<>(availableQuestions);
	    Collections.shuffle(randomQuestions);

	    int requiredQuestionCount = Integer.parseInt(test.getNumberOFQuestions());
	    if (randomQuestions.size() > requiredQuestionCount) {
	        randomQuestions = randomQuestions.subList(0, requiredQuestionCount);
	    }

	    return ResponseEntity.ok(randomQuestions);
	}

	
	@GetMapping("/test/all/{tId}")
	public ResponseEntity<?> getAllQuestionsOfQuiz(@PathVariable("tId") Long tId){		

		Test test = new Test();
		test.setqId(tId);
		Set<Question> questionOfQuiz = this.questionService.getQuestionsOfTest(test);
		
	   return ResponseEntity.ok(questionOfQuiz);
	}
	
	public int getAllQuestionSize(Long tId){		

		Test test = new Test();
		test.setqId(tId);
		Set<Question> questionOfQuiz = this.questionService.getQuestionsOfTest(test);
		
	   return questionOfQuiz.size();
	}
	
	//get single question
	@GetMapping("/{quesId}")
	public Question getQuestion(@PathVariable("quesId") Long Id) {
		return this.questionService.getQuestion(Id);
	}
	
	//delete question
	@DeleteMapping("/{quesId}")
	public void deleteQuestion(@PathVariable("quesId") Long Id) {
		this.questionService.deleteQuestion(Id);
	}
}
