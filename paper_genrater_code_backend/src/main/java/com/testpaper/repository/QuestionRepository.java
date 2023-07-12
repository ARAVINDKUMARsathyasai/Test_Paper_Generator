package com.testpaper.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.testpaper.model.Question;
import com.testpaper.model.Test;

@Repository
public interface QuestionRepository extends JpaRepository<Question,Long> {

   public Set<Question> findByTest(Test test);
   
}
