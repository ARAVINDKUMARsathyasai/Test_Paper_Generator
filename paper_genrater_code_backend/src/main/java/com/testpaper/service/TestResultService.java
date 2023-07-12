package com.testpaper.service;

import java.util.List;

import com.testpaper.model.TestResult;

public interface TestResultService {
	public TestResult getTestResultById(Long id);

	public List<TestResult> getTestResultsByUserId(Long userId);

	public List<TestResult> getTestResultsByUserIdAndTestId(Long userId, Long testId);
}
