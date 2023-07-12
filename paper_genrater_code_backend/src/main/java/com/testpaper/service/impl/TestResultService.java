package com.testpaper.service.impl;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.testpaper.model.TestResult;
import com.testpaper.repository.TestResultRepository;

@Service
public class TestResultService implements com.testpaper.service.TestResultService {

	private final TestResultRepository testResultRepository;

    @Autowired
    public TestResultService(TestResultRepository testResultRepository) {
        this.testResultRepository = testResultRepository;
    }

    public TestResult getTestResultById(Long id) {
        Optional<TestResult> testResultOptional = testResultRepository.findById(id);
        return testResultOptional.orElseThrow(NoSuchElementException::new);
    }

    public List<TestResult> getTestResultsByUserId(Long testId) {
        return testResultRepository.findByTestId(testId);
    }

	@Override
	 public List<TestResult> getTestResultsByUserIdAndTestId(Long userId, Long testId) {
        return testResultRepository.findByUserIdAndTestId(userId, testId);
    }
}
