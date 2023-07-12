package com.testpaper.service.impl;

import java.util.Set;
import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.testpaper.model.Subject;
import com.testpaper.model.Test;
import com.testpaper.repository.TestRepository;
import com.testpaper.service.TestService;

@Service
public class TestServicesImpl implements TestService {
	
	@Autowired
	private TestRepository testRepo;

	@Override
	public Test addTest(Test test) {
		return this.testRepo.save(test);
	}

	@Override
	public Test updateTest(Test test) {
		return this.testRepo.save(test);
	}

	@Override
	public Set<Test> getTestes() {
		return new HashSet<>(this.testRepo.findAll());
	}

	@Override
	public Test getTest(Long testId) {
		return this.testRepo.findById(testId).get();
	}

	@Override
	public void deleteTest(Long testId) {
		Test test = new Test();
		test.setqId(testId);
		this.testRepo.delete(test);
	}

	@Override
	public int getQuizCount() {
		// TODO Auto-generated method stub
		return (int)testRepo.count();
	}

	@Override
	public List<Test> getTestsOfSubject(Subject sub) {
		// TODO Auto-generated method stub
		return this.testRepo.findBysubject(sub);
	}
}
