package com.hackathon.hackhthon.portal.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackathon.hackhthon.portal.entities.Evaluation;
import com.hackathon.hackhthon.portal.entities.Idea;

public interface EvaluationRepository extends JpaRepository<Evaluation, Integer> {

	List<Evaluation> findByJudgeId(int judgeId);

	List<Evaluation> findByIdeaId(int id);

	List<Idea> findIdeaByJudgeId(int judgeId);
}
