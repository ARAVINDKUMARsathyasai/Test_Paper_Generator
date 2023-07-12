package com.testpaper.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.testpaper.model.TestResult;

public interface TestResultRepository extends JpaRepository<TestResult, Long> {

	public List<TestResult> findByUserIdAndTestId(Long userId, Long testId);

	public List<TestResult> findByTestId(Long testId);
}

