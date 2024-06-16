package com.hackathon.hackhthon.portal.services;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.hackathon.hackhthon.portal.entities.Idea;

@Service
public interface ScheduleService {

	public long convertMinutesToMilliSeconds(int hours);

	ResponseEntity<Object> addAllSchedules(int adminId);

	ResponseEntity<Object> getIdeaSubmissionSchedule();

	ResponseEntity<Object> getIdeaReviewSchedule();

	ResponseEntity<Object> getProjectSubmissionSchedule();

	ResponseEntity<Object> getStatusOfHackathon();

	ResponseEntity<Object> getEndTimeOfHackathon();

	void createProjectEvaluationSchedule(Idea idea);

	ResponseEntity<Object> getSchedulesForJudge(int integer);
}