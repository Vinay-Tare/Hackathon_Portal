package com.hackathon.hackhthon.portal.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackathon.hackhthon.portal.dto.AssignJudgesDTO;
import com.hackathon.hackhthon.portal.entities.Evaluation;
import com.hackathon.hackhthon.portal.services.EvaluationServiceImplementation;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/projectEvaluation")
public class EvalutionController {

	@Autowired
	private EvaluationServiceImplementation evaluationService;

	@PostMapping("/")
	public ResponseEntity<Object> evalute(@RequestBody Evaluation evaluation) {
		return evaluationService.projectEvaluation(evaluation);
	}

	@PostMapping("/assignJudges")
	public ResponseEntity<Object> assignJudges(@RequestBody AssignJudgesDTO assignJudgesDTO) {
		return evaluationService.assignJudgesToProject(assignJudgesDTO);
	}

	@PostMapping("/judge")
	public ResponseEntity<Object> getEvaluationssAssignedToJudge(@RequestBody Map<String, Integer> judge) {
		return evaluationService.getAssignedEvaluations(judge.get("judgeId"));
	}

	// this function will return the list of the winners team name and team details
	@GetMapping("/getWinners")
	public ResponseEntity<Object> getWinners() {
		return evaluationService.getWinnerList();
	}
}
