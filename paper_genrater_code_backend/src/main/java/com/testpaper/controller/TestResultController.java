package com.testpaper.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.testpaper.model.TestResult;
import com.testpaper.repository.TestResultRepository;
import com.testpaper.service.TestResultService;

@RestController
@RequestMapping("/test-results")
@CrossOrigin("http://localhost:3000/")
public class TestResultController {

    private final TestResultRepository testResultRepository;
    
    @Autowired
    private TestResultService testResultService;

    @Autowired
    public TestResultController(TestResultRepository testResultRepository) {
        this.testResultRepository = testResultRepository;
    }

    @PostMapping
    public ResponseEntity<TestResult> submitTestResult(@RequestBody TestResult testResult) {
        TestResult savedTestResult = testResultRepository.save(testResult);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTestResult);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TestResult> getTestResultById(@PathVariable("id") Long id) {
      try {
        TestResult testResult = testResultService.getTestResultById(id);
        return ResponseEntity.ok(testResult);
      } catch (NoSuchElementException e) {
        return ResponseEntity.notFound().build();
      }
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TestResult>> getTestResultsByUserId(@PathVariable("userId") Long userId) {
      try {
        List<TestResult> testResults = testResultService.getTestResultsByUserId(userId);
        return ResponseEntity.ok(testResults);
      } catch (NoSuchElementException e) {
        return ResponseEntity.notFound().build();
      }
    }
    
    @GetMapping("/user/{userId}/test/{testId}")
    public ResponseEntity<List<TestResult>> getTestResultsByUserIdAndTestId(
            @PathVariable("userId") Long userId,
            @PathVariable("testId") Long testId) {
        try {
            List<TestResult> testResults = testResultService.getTestResultsByUserIdAndTestId(userId, testId);
            return ResponseEntity.ok(testResults);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }
}