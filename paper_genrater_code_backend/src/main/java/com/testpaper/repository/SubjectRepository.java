package com.testpaper.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.testpaper.model.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject,Long>{

}
