package com.testpaper.service;

import java.util.Set;

import com.testpaper.model.Subject;

public interface SubjectService {
	
	//create a new subject
	public Subject addSubject(Subject subject);
	
	//update the required subject
	public Subject updateSubject(Subject subject);
	
	//get all subjects
	public Set<Subject> getSubjects();
	
	//get subject details by subject id
	public Subject getSubject(Long subjectId);
	
	//delete any subject id
	public void deleteSubject(Long subjectId);
}
