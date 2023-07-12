package com.testpaper.controller;

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

import com.testpaper.model.Subject;
import com.testpaper.service.SubjectService;

@RestController
@RequestMapping("/subject")
@CrossOrigin("http://localhost:3000/")
public class SubjectController {
	
	@Autowired
	private SubjectService subjectService;
	
	//add Subject
	@PostMapping("/")
	public ResponseEntity<Subject> addSubject(@RequestBody Subject subject){
		Subject sub = this.subjectService.addSubject(subject);
		return ResponseEntity.ok(sub);
	}
	
	//get category
	@GetMapping("/{subjectId}")
	public Subject getSubject(@PathVariable("subjectId") Long subId) {
		return this.subjectService.getSubject(subId);
	}
	
	//get all categories
	@GetMapping("/")
	public ResponseEntity<?> getSubjects(){
		return ResponseEntity.ok(this.subjectService.getSubjects());
	}
	
	//update subject
	@PutMapping("/")
	public Subject updateSubject(@RequestBody Subject subject) {
		return this.subjectService.updateSubject(subject);
	}
	
	//Delete subject
	@DeleteMapping("/{subjectId}")
	public void deleteSubject(@PathVariable("subjectId") Long subId) {
		this.subjectService.deleteSubject(subId);
	}
}
