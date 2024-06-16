package com.hackathon.hackhthon.portal.services;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hackathon.hackhthon.portal.dto.CustomResponseDTO;
import com.hackathon.hackhthon.portal.dto.ErrorDTO;
import com.hackathon.hackhthon.portal.entities.Evaluation;
import com.hackathon.hackhthon.portal.entities.Idea;
import com.hackathon.hackhthon.portal.entities.Schedule;
import com.hackathon.hackhthon.portal.entities.User;
import com.hackathon.hackhthon.portal.repositories.EvaluationRepository;
import com.hackathon.hackhthon.portal.repositories.IdeaRepository;
import com.hackathon.hackhthon.portal.repositories.ScheduleRepository;
import com.hackathon.hackhthon.portal.repositories.UserRepository;

@Service
public class ScheduleServiceImplementation implements ScheduleService {

	@Autowired
	private ScheduleRepository scheduleRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	IdeaRepository ideaRepository;

	@Autowired
	EvaluationRepository evaluationRepository;

	public long convertMinutesToMilliSeconds(int minutes) {
		return minutes * 60 * 1000;
	}

	@Override
	public ResponseEntity<Object> addAllSchedules(int adminId) {
		Optional<User> optionalUser = userRepository.findById(adminId);
		if (optionalUser.isEmpty()) {
			return new ResponseEntity<Object>(
					new ErrorDTO(HttpStatus.BAD_REQUEST.toString(), "Admin User Not Found", "No Message"),
					HttpStatus.BAD_REQUEST);
		} else {
			scheduleRepository.deleteAll();
			evaluationRepository.deleteAll();
			ideaRepository.deleteAll();

			// Store Current DateTime
			Timestamp ideaSubmissionStartDateTime = Timestamp.valueOf(LocalDateTime.now());

			// Idea Submission Time In MilliSeconds
			long ideaSubmissionTime = convertMinutesToMilliSeconds(4);

			// Idea Submission End DateTime
			Timestamp ideaSubmissionEndDateTime = new Timestamp(
					ideaSubmissionStartDateTime.getTime() + ideaSubmissionTime);

			Schedule ideaSubmissionSchedule = new Schedule();
			ideaSubmissionSchedule.setName("IDEA SUBMISSION");
			ideaSubmissionSchedule.setStartTime(ideaSubmissionStartDateTime.toLocalDateTime());
			ideaSubmissionSchedule.setEndTime(ideaSubmissionEndDateTime.toLocalDateTime());

			// Idea Review Time In MilliSeconds
			long ideaReviewTime = convertMinutesToMilliSeconds(2);

			// Idea Review End DateTime
			Timestamp ideaReviewStartTime = new Timestamp(
					ideaSubmissionEndDateTime.getTime() + convertMinutesToMilliSeconds(1));
			Timestamp ideaReviewEndDateTime = new Timestamp(ideaReviewStartTime.getTime() + ideaReviewTime);

			Schedule ideaReviewSchedule = new Schedule();
			ideaReviewSchedule.setName("IDEA REVIEW");
			ideaReviewSchedule.setStartTime(ideaReviewStartTime.toLocalDateTime());
			ideaReviewSchedule.setEndTime(ideaReviewEndDateTime.toLocalDateTime());

			// Project Submission Time In MilliSeconds
			long projectSubmissionTime = convertMinutesToMilliSeconds(3);

			// Project Submission End DateTime
			Timestamp projectSubmissionEndDateTime = new Timestamp(
					ideaReviewEndDateTime.getTime() + projectSubmissionTime);

			Schedule projectSubmissionSchedule = new Schedule();
			projectSubmissionSchedule.setName("PROJECT SUBMISSION");
			projectSubmissionSchedule.setStartTime(ideaReviewEndDateTime.toLocalDateTime());
			projectSubmissionSchedule.setEndTime(projectSubmissionEndDateTime.toLocalDateTime());

			List<Schedule> schedules = Arrays.asList(ideaSubmissionSchedule, ideaReviewSchedule,
					projectSubmissionSchedule);

			return new ResponseEntity<Object>(scheduleRepository.saveAll(schedules), HttpStatus.CREATED);
		}
	}

	@Override
	public ResponseEntity<Object> getStatusOfHackathon() {
		List<Schedule> schedules = scheduleRepository.findAll(Sort.by(Sort.Direction.DESC, "endTime"));
		if (schedules.size() == 0) {
			return new ResponseEntity<Object>(new ErrorDTO(HttpStatus.BAD_REQUEST.toString(),
					"No Schdule Found - Hackathon Is Not Started Yet", "No Message"), HttpStatus.OK);
		} else {
			Timestamp hackathonEndDateTime = Timestamp.valueOf(schedules.get(0).getEndTime());
			long het = hackathonEndDateTime.getTime();
			Timestamp currentDateTime = Timestamp.valueOf(LocalDateTime.now());
			long ct = currentDateTime.getTime();
			if ((het - ct) <= 0) {
				return new ResponseEntity<Object>(new CustomResponseDTO(HttpStatus.OK.toString(), "HACKATHON ENDED"),
						HttpStatus.OK);
			} else {
				return new ResponseEntity<Object>(new CustomResponseDTO(HttpStatus.OK.toString(), "HACKATHON RUNNING"),
						HttpStatus.OK);
			}
		}
	}

	@Override
	public ResponseEntity<Object> getIdeaSubmissionSchedule() {
		Optional<Schedule> optionalSchedule = scheduleRepository.findByName("IDEA SUBMISSION");
		if (optionalSchedule.isPresent()) {
			return new ResponseEntity<Object>(optionalSchedule.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<Object>(
					new ErrorDTO(HttpStatus.NO_CONTENT.toString(), "Idea Submission Schedule Not Found", "No Message"),
					HttpStatus.NO_CONTENT);
		}
	}

	@Override
	public ResponseEntity<Object> getIdeaReviewSchedule() {
		Optional<Schedule> optionalSchedule = scheduleRepository.findByName("IDEA REVIEW");
		if (optionalSchedule.isPresent()) {
			return new ResponseEntity<Object>(optionalSchedule.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<Object>(
					new ErrorDTO(HttpStatus.NO_CONTENT.toString(), "Idea Review Schedule Not Found", "No Message"),
					HttpStatus.NO_CONTENT);
		}
	}

	@Override
	public ResponseEntity<Object> getProjectSubmissionSchedule() {
		Optional<Schedule> optionalSchedule = scheduleRepository.findByName("PROJECT SUBMISSION");
		if (optionalSchedule.isPresent()) {
			return new ResponseEntity<Object>(optionalSchedule.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<Object>(new ErrorDTO(HttpStatus.NO_CONTENT.toString(),
					"Project Submission Schedule Not Found", "No Message"), HttpStatus.NO_CONTENT);
		}
	}

	@Override
	public void createProjectEvaluationSchedule(Idea idea) {
		List<Schedule> schedules = scheduleRepository.findAll(Sort.by(Sort.Direction.DESC, "endTime"));
		Schedule peSchedule = new Schedule();
		peSchedule.setName("PROJECT EVALUATION " + idea.getId());
		peSchedule.setProject(idea);
		try {
			Schedule lastSchedule = schedules.get(0);
			peSchedule.setStartTime(lastSchedule.getEndTime());
			peSchedule.setEndTime(new Timestamp(
					Timestamp.valueOf(lastSchedule.getEndTime()).getTime() + convertMinutesToMilliSeconds(1))
					.toLocalDateTime());
			scheduleRepository.save(peSchedule);
		} catch (Exception e) {
			System.out.println(e);
		}
	}

	@Override
	public ResponseEntity<Object> getEndTimeOfHackathon() {
		List<Schedule> schedules = scheduleRepository.findAll(Sort.by(Sort.Direction.DESC, "endTime"));
		try {
			Schedule lastSchedule = schedules.get(0);
			LocalDateTime hackathonEndTime = lastSchedule.getEndTime();
			return new ResponseEntity<Object>(Map.entry("hackathonEndTime", hackathonEndTime), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(
					new ErrorDTO(HttpStatus.NO_CONTENT.toString(), "Hackathon Schedule Not Found", "No Message"),
					HttpStatus.NO_CONTENT);
		}
	}

	@Override
	public ResponseEntity<Object> getSchedulesForJudge(int judgeId) {
		Optional<User> judgeOptional = userRepository.findById(judgeId);
		if (judgeOptional.isEmpty()) {
			return new ResponseEntity<Object>(
					new ErrorDTO(HttpStatus.BAD_REQUEST.toString(), "Judge Not Found", "No Message"),
					HttpStatus.BAD_REQUEST);
		} else {
			User foundJudge = judgeOptional.get();
			List<Evaluation> linkedEvaluations = evaluationRepository.findByJudgeId(foundJudge.getId());
			List<Idea> projectAssignedToJudge = linkedEvaluations.stream().map((e) -> e.getIdea()).toList();
			List<Schedule> schedulesForJudge = projectAssignedToJudge.stream().map((project) -> {
				return scheduleRepository.findByProject(project).orElse(null);
			}).sorted((s1, s2) -> (Timestamp.valueOf(s1.getStartTime()).getTime() < Timestamp.valueOf(s2.getStartTime())
					.getTime()) ? -1 : 1).toList();

			return new ResponseEntity<Object>(schedulesForJudge, HttpStatus.OK);
		}
	}

}