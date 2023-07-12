package com.testpaper.controller;

import java.util.List;

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

import com.testpaper.model.Test;
import com.testpaper.model.Subject;
import com.testpaper.repository.TestRepository;
import com.testpaper.service.TestService;


/**
 * This is a testController class this is to handle the http requests from the client side
 * 
 * @author TPS team
 * @since  
 */
@RestController
@RequestMapping("/test")
@CrossOrigin("http://localhost:3000/")
public class TestController {
	
	@Autowired
	private TestService testService;
	
	@Autowired
	private TestRepository testRepo;
	
	//add test service
	@PostMapping("/")
	public ResponseEntity<Test> addTest(@RequestBody Test test){
		return ResponseEntity.ok(this.testService.addTest(test));
	}
	
	//update the required test data
	@PutMapping("/")
	public ResponseEntity<Test> updateTest(@RequestBody Test test){
		return ResponseEntity.ok(this.testService.updateTest(test));
	}
	
	@PutMapping("/disable/{id}")
	public ResponseEntity<?> disableUser(@PathVariable("id") Long testId) {
	    Test test = this.testRepo.findById(testId).orElse(null);

	    if (test == null) {
	        return ResponseEntity.notFound().build();
	    }

	    int numberOfQuestions = Integer.parseInt(test.getNumberOFQuestions());
	    int totalQuestions = test.getQuestions().size();
	    
	    System.out.println("Counts "+numberOfQuestions+"  "+totalQuestions);

	    if (numberOfQuestions > totalQuestions) {
	        return ResponseEntity.badRequest().body("Number of questions exceeds the available questions");
	    }

	    test.setActive(!test.isActive());
	    Test updatedTest = this.testRepo.save(test);

	    return ResponseEntity.ok(updatedTest);
	}

	
	//get all tests 
	@GetMapping("/")
	public ResponseEntity<?> Testes(){
		return ResponseEntity.ok(this.testService.getTestes());
	}
	
	@GetMapping("/{tId}")
	public Test test(@PathVariable("tId") Long testId) {
		return this.testService.getTest(testId);
	}
	
	@DeleteMapping("/{tId}")
	public void delete(@PathVariable("tId") Long testId) {
		this.testService.deleteTest(testId); 
	}
	
	@GetMapping("/subject/{subId}")
	public List<Test> getTestsOfCategory(@PathVariable("subId") Long subId){
		Subject sub = new Subject();
		sub.setSubId(subId);
		return this.testService.getTestsOfSubject(sub);
	}
}
