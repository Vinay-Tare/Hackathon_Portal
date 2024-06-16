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

import com.hackathon.hackhthon.portal.services.ScheduleService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/schedules")
public class ScheduleController {

	@Autowired
	private ScheduleService scheduleService;

	@PostMapping("/")
	public ResponseEntity<Object> addSchedules(@RequestBody Map<String, Integer> admin) {
		return scheduleService.addAllSchedules(admin.get("adminId"));
	}
	
	@PostMapping("/judge")
	public ResponseEntity<Object> getScheduleByJudgeId(@RequestBody Map<String, Integer> judge) {
		return scheduleService.getSchedulesForJudge(judge.get("judgeId"));
	}


	@GetMapping("/getHackathonStatus")
	public ResponseEntity<Object> getHackathonStatus() {
		return scheduleService.getStatusOfHackathon();
	}

	@GetMapping("/ideaSubmission")
	public ResponseEntity<Object> ideaSubmissionSchedule() {
		return scheduleService.getIdeaSubmissionSchedule();
	}

	@GetMapping("/ideaReview")
	public ResponseEntity<Object> ideaReviewSchedule() {
		return scheduleService.getIdeaReviewSchedule();
	}

	@GetMapping("/projectSubmission")
	public ResponseEntity<Object> projectSubmissionSchedule() {
		return scheduleService.getProjectSubmissionSchedule();
	}

	@GetMapping("/getHackathonEndTime")
	public ResponseEntity<Object> getHackathonEndTime() {
		return scheduleService.getEndTimeOfHackathon();
	}
}
