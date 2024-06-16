package com.hackathon.hackhthon.portal.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hackathon.hackhthon.portal.dto.AssignJudgesDTO;
import com.hackathon.hackhthon.portal.dto.ErrorDTO;
import com.hackathon.hackhthon.portal.dto.WinnerDTO;
import com.hackathon.hackhthon.portal.entities.Evaluation;
import com.hackathon.hackhthon.portal.entities.Idea;
import com.hackathon.hackhthon.portal.entities.User;
import com.hackathon.hackhthon.portal.repositories.EvaluationRepository;
import com.hackathon.hackhthon.portal.repositories.IdeaRepository;
import com.hackathon.hackhthon.portal.repositories.ScheduleRepository;
import com.hackathon.hackhthon.portal.repositories.UserRepository;

@Service
public class EvaluationServiceImplementation implements EvaluationService {

	@Autowired
	EvaluationRepository evaluationRepository;

	@Autowired
	IdeaRepository ideaRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	ScheduleRepository scheduleRepository;

	@Autowired
	ScheduleService scheduleService;

	@Override
	public ResponseEntity<Object> getAssignedEvaluations(int judgeId) {
		List<Evaluation> evaluations = evaluationRepository.findByJudgeId(judgeId);
		if (evaluations.isEmpty()) {
			return new ResponseEntity<Object>(Collections.emptyList(), HttpStatus.OK);

		}
		evaluations.stream().forEach(evaluation -> evaluation.getIdea().getPanelist().setPassword(null));
		evaluations.stream().forEach(evaluation -> evaluation.getJudge().setPassword(null));
		return new ResponseEntity<Object>(evaluations, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Object> projectEvaluation(Evaluation evaluation) {
		return new ResponseEntity<Object>(evaluationRepository.save(evaluation), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Object> assignJudgesToProject(AssignJudgesDTO assignJudgesDTO) {
		Optional<Idea> optionalIdea = ideaRepository.findById(assignJudgesDTO.getProjectId());
		if (optionalIdea.isPresent()) {
			Idea foundIdea = optionalIdea.get();
			System.err.println("SEE" + foundIdea);
			List<Evaluation> previousEvaluations = evaluationRepository.findByIdeaId(foundIdea.getId());
			evaluationRepository.deleteAll(previousEvaluations);

			List<Evaluation> listOfEvaluation = new ArrayList<>();
			assignJudgesDTO.getListOfJudgeId().stream().forEach((judgeId) -> {
				Evaluation e = new Evaluation();
				e.setIdea(foundIdea);
				User user = userRepository.findById(judgeId).get();
				e.setJudge(user);
				e.setRemark("");
				e.setFuturePlans(0);
				e.setTechnicalDifficulty(0);
				e.setWowFactor(0);
				listOfEvaluation.add(e);
			});

			List<Evaluation> savedEvaluations = evaluationRepository.saveAll(listOfEvaluation);
			savedEvaluations.stream().forEach((e) -> {
				e.getJudge().setPassword(null);
			});
			return new ResponseEntity<Object>(savedEvaluations, HttpStatus.OK);
		} else {
			return new ResponseEntity<Object>(
					new ErrorDTO(HttpStatus.BAD_REQUEST.toString(), "Idea Not Found", "No Message"),
					HttpStatus.BAD_REQUEST);
		}
	}

	@Override
	public ResponseEntity<Object> getWinnerList() {
		List<Evaluation> evaluations = evaluationRepository.findAll();
//		Map<Integer, Double> averageRatings = evaluations.stream()
//				.collect(Collectors.groupingBy(e -> e.getIdea().getId(), Collectors.averagingDouble(
//						e -> (e.getFuturePlans() + e.getTechnicalDifficulty() + e.getWowFactor()) / 3.0)));

		Map<Idea, Map<Integer, List<Evaluation>>> evaluationsByIdeaAndJudge = evaluations.stream()
				.collect(Collectors.groupingBy(e -> e.getIdea(), Collectors.groupingBy(e -> e.getJudge().getId())));

		// calculate the average rating for each idea and judge combined
		Map<Idea, Map<Integer, Double>> averageRatingsByIdeaAndJudge = new HashMap<>();
		for (Map.Entry<Idea, Map<Integer, List<Evaluation>>> entry : evaluationsByIdeaAndJudge.entrySet()) {
			Idea idea = entry.getKey();
			Map<Integer, List<Evaluation>> evaluationsByJudge = entry.getValue();
			Map<Integer, Double> averageRatingsByJudge = new HashMap<>();
			for (Map.Entry<Integer, List<Evaluation>> judgeEntry : evaluationsByJudge.entrySet()) {
				Integer judgeId = judgeEntry.getKey();
				List<Evaluation> evaluationsByJudgeList = judgeEntry.getValue();
				double averageRating = evaluationsByJudgeList.stream()
						.mapToDouble(e -> (e.getFuturePlans() + e.getTechnicalDifficulty() + e.getWowFactor()) / 3.0)
						.average().orElse(0.0);
				averageRatingsByJudge.put(judgeId, averageRating);
				System.out.println("judgeId " + judgeId + " average rating " + averageRating);
			}
			averageRatingsByIdeaAndJudge.put(idea, averageRatingsByJudge);

			System.out.println(averageRatingsByJudge);
		}

		// Calculate the overall rating for each idea by averaging the rating given by
		// each judge
		Map<Idea, Double> averageRatingsByIdea = averageRatingsByIdeaAndJudge.entrySet().stream()
				.collect(Collectors.toMap(Map.Entry::getKey, entry -> {
					Map<Integer, Double> averageRatingsByJudge = entry.getValue();
					return averageRatingsByJudge.values().stream().mapToDouble(Double::doubleValue).average()
							.orElse(0.0);
				}));

		// get the top 3 ideas by sorting the avarageRatingByIdea by value and select
		// top 3 ideas
		List<String> topThreeIdeas = averageRatingsByIdea.entrySet().stream()
				.sorted(Map.Entry.<Idea, Double>comparingByValue().reversed()).limit(3)
				.map(entry -> entry.getKey().getTeamName()).collect(Collectors.toList());
		try {
//		Constructing Winners List 
			List<WinnerDTO> winners = new ArrayList<>();
			List<String> winnerTeamMembers = userRepository.findByTeamName(topThreeIdeas.get(0)).stream()
					.map((u) -> u.getName()).collect(Collectors.toList());
			List<String> firstRunnerUpTeamMembers = userRepository.findByTeamName(topThreeIdeas.get(1)).stream()
					.map((u) -> u.getName()).collect(Collectors.toList());
			List<String> secondRunnerUpTeamMembers = userRepository.findByTeamName(topThreeIdeas.get(2)).stream()
					.map((u) -> u.getName()).collect(Collectors.toList());

			WinnerDTO first = new WinnerDTO(1, topThreeIdeas.get(0), "Winner", 1, "st", winnerTeamMembers);

			WinnerDTO second = new WinnerDTO(2, topThreeIdeas.get(1), "1st Runner Up", 2, "nd",
					firstRunnerUpTeamMembers);

			WinnerDTO third = new WinnerDTO(3, topThreeIdeas.get(2), "2nd Runner Up", 3, "rd",
					secondRunnerUpTeamMembers);

			winners.add(first);
			winners.add(second);
			winners.add(third);
			return new ResponseEntity<Object>(winners, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(
					new ErrorDTO(HttpStatus.NO_CONTENT.toString(), "Winners List Cannot Be Formed", "No Message"),
					HttpStatus.NO_CONTENT);
		}
	}

}
