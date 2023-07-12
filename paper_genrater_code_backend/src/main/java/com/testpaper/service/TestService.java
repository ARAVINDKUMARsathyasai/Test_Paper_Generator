package com.testpaper.service;

import java.util.List;
import java.util.Set;

import org.springframework.http.ResponseEntity;

import com.testpaper.model.Subject;
import com.testpaper.model.Test;

public interface TestService {
	public Test addTest(Test test);
	
	public Test updateTest(Test test);
	
	public Set<Test> getTestes();
	
	public Test getTest(Long testId);
	
	public void deleteTest(Long testId);

	public int getQuizCount();

	public List<Test> getTestsOfSubject(Subject sub);

}
