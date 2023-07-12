package com.testpaper.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.testpaper.model.Subject;
import com.testpaper.model.Test;

@Repository
public interface TestRepository extends JpaRepository<Test,Long>{

	public long countByActive(boolean b);
	
	public List<Test> findBysubject(Subject subject);

}
