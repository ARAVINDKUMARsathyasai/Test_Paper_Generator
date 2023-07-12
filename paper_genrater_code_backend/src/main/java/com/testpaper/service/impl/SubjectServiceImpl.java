package com.testpaper.service.impl;

import java.util.Set;
import java.util.LinkedHashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.testpaper.model.Subject;
import com.testpaper.repository.SubjectRepository;
import com.testpaper.service.SubjectService;

@Service
public class SubjectServiceImpl implements SubjectService {

	@Autowired
	private SubjectRepository subjectRepo;
	
	@Override
	public Subject addSubject(Subject subject) {
		return this.subjectRepo.save(subject);
	}

	@Override
	public Subject updateSubject(Subject subject) {
		return this.subjectRepo.save(subject);
	}

	@Override
	public Set<Subject> getSubjects() {
		return new LinkedHashSet<>(this.subjectRepo.findAll());
	}

	@Override
	public Subject getSubject(Long subjectId) {
		return this.subjectRepo.findById(subjectId).get();
	}

	@Override
	public void deleteSubject(Long subjectId) {
		Subject subject = new Subject();
		subject.setSubId(subjectId);
		this.subjectRepo.delete(subject);
	}

}
