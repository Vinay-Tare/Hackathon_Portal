package com.hackathon.hackhthon.portal.services;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hackathon.hackhthon.portal.dto.AssignJudgesDTO;
import com.hackathon.hackhthon.portal.entities.Evaluation;

@Service
public interface EvaluationService {
	
	public ResponseEntity<Object> projectEvaluation(Evaluation evaluation);

	public ResponseEntity<Object> getAssignedEvaluations(int judgeId);

	public ResponseEntity<Object> assignJudgesToProject(AssignJudgesDTO assignJudgesDTO);

	public ResponseEntity<Object> getWinnerList();

}
