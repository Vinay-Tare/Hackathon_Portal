
package com.hackathon.hackhthon.portal.services;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import com.hackathon.hackhthon.portal.dto.AssignIdeaToPanelistDTO;
import com.hackathon.hackhthon.portal.dto.CustomResponseDTO;
import com.hackathon.hackhthon.portal.dto.ErrorDTO;
import com.hackathon.hackhthon.portal.dto.JudgesAssignedToProjectDTO;
import com.hackathon.hackhthon.portal.entities.Evaluation;
import com.hackathon.hackhthon.portal.entities.Idea;
import com.hackathon.hackhthon.portal.entities.User;
import com.hackathon.hackhthon.portal.repositories.EvaluationRepository;
import com.hackathon.hackhthon.portal.repositories.IdeaRepository;
import com.hackathon.hackhthon.portal.repositories.UserRepository;

@Service
public class IdeaServiceImplementation implements IdeaService {
	@Autowired
	IdeaRepository ideaRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	EvaluationRepository evaluationRepository;

	@Autowired
	ScheduleService scheduleService;

	public ResponseEntity<Object> addIdea(Idea idea) {
//		Check If The Team Has Already Submitted An Idea 
		if (ideaRepository.existsByTeamName(idea.getTeamName())) {
			ErrorDTO error = new ErrorDTO(HttpStatus.BAD_REQUEST.toString(), "You Have Already Submitted Your Idea",
					"No Message");
			return new ResponseEntity<Object>(error, HttpStatus.BAD_REQUEST);
		}

//		Check If The Idea Has A Title Same As An Existing Idea Title
		if (ideaRepository.existsByTitle(idea.getTitle())) {
			ErrorDTO error = new ErrorDTO(HttpStatus.BAD_REQUEST.toString(), "Idea Already Exists With Same Title",
					"No Message");
			return new ResponseEntity<Object>(error, HttpStatus.BAD_REQUEST);
		}

//		Check If The Team Has Less Than 3 Members
		if (userRepository.findByTeamName(idea.getTeamName()).size() < 3) {
			ErrorDTO error = new ErrorDTO(HttpStatus.BAD_REQUEST.toString(), "Team Should Have Atleast 3 Team Members",
					"No Message");
			return new ResponseEntity<Object>(error, HttpStatus.BAD_REQUEST);
		}

		idea.setReviewComment("");
		idea.setStatus("UNDER REVIEW");
		try {
			Idea savedIdea = ideaRepository.save(idea);
			return new ResponseEntity<Object>(savedIdea, HttpStatus.CREATED);
		} catch (Exception e) {
			ErrorDTO error = new ErrorDTO(HttpStatus.BAD_REQUEST.toString(), "Error Submitting Idea", "No Message");
			return new ResponseEntity<Object>(error, HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<Object> updateIdea(Idea idea) {
		Optional<Idea> ideaOptional = ideaRepository.findById(idea.getId());
		if (ideaOptional.isEmpty()) {
			ErrorDTO error = new ErrorDTO(HttpStatus.BAD_REQUEST.toString(), "Idea Not Found", "No Message");
			return new ResponseEntity<Object>(error, HttpStatus.BAD_REQUEST);
		}
		Idea foundIdea = ideaOptional.get();
		if (foundIdea.getStatus().equals("REVIEWED")) {
			idea.setStatus("UNDER REVIEW");
			return new ResponseEntity<Object>(ideaRepository.save(idea), HttpStatus.OK);
		}
		ErrorDTO error = new ErrorDTO(HttpStatus.BAD_REQUEST.toString(), "You Have Already Submitted Your Idea",
				"No Message");
		return new ResponseEntity<Object>(error, HttpStatus.BAD_REQUEST);
	}

	public ResponseEntity<Object> setReview(Idea idea) {
		Optional<Idea> ideaOptional = ideaRepository.findById(idea.getId());
		if (ideaOptional.isPresent()) {
			Idea foundIdea = ideaOptional.get();
			if (foundIdea.getStatus().equals("REVIEWED")) {
				ErrorDTO error = new ErrorDTO(HttpStatus.BAD_REQUEST.toString(), "Idea Already Reviewed", "No Message");
				return new ResponseEntity<Object>(error, HttpStatus.BAD_REQUEST);
			}
			if (foundIdea.getStatus().equals("UNDER REVIEW")) {
				if (idea.getStatus().equals("ACCEPTED")) {
					scheduleService.createProjectEvaluationSchedule(idea);
				}
				return new ResponseEntity<Object>(ideaRepository.save(idea), HttpStatus.CREATED);
			} else {
				ErrorDTO error = new ErrorDTO(HttpStatus.BAD_REQUEST.toString(), "Cannot Process Your Request",
						"No Message");
				return new ResponseEntity<Object>(error, HttpStatus.BAD_REQUEST);
			}
		} else {
			ErrorDTO error = new ErrorDTO(HttpStatus.BAD_REQUEST.toString(), "Idea Not Found", "No Message");
			return new ResponseEntity<Object>(error, HttpStatus.BAD_REQUEST);
		}
	}

	// This function will return all the ideas assigned to the panelist
	// whose panelist Id matches the given panelist Id
	public ResponseEntity<Object> getAssignedIdeas(int panelistId) {

		List<Idea> ideas = ideaRepository.findByPanelistId(panelistId);
		ideas.stream().forEach(idea -> idea.getPanelist().setPassword(null));
		if (ideas.isEmpty()) {
			return new ResponseEntity<Object>(Collections.emptyList(), HttpStatus.OK);
		}
		return new ResponseEntity<Object>(ideas, HttpStatus.OK);
	}

	public ResponseEntity<Object> getAllIdeasOrProjectsWithAssignedJudges() {
		List<Idea> ideas = ideaRepository.findAll();
		HashMap<Idea, List<User>> map = new HashMap<>();

		ideas.stream().forEach(idea -> {
			if (idea.getPanelist() != null) {
				idea.getPanelist().setPassword(null);
			}
			map.put(idea, new ArrayList<User>());
		});

		List<Evaluation> evaluations = evaluationRepository.findAll();

		evaluations.stream().forEach(evaluation -> {
			evaluation.getJudge().setPassword(null);
			List<User> judges = map.get(evaluation.getIdea());
			judges.add(evaluation.getJudge());
			map.put(evaluation.getIdea(), judges);
		});

		List<JudgesAssignedToProjectDTO> judgesAssignedToProjectDTO = new ArrayList<>();

		for (Idea idea : map.keySet()) {
			JudgesAssignedToProjectDTO jatpDTO = new JudgesAssignedToProjectDTO(idea, map.get(idea));
			judgesAssignedToProjectDTO.add(jatpDTO);
		}

		return new ResponseEntity<Object>(judgesAssignedToProjectDTO, HttpStatus.OK);
	}

	public ResponseEntity<Object> getParticipantIdea(int participantId) {
		Optional<User> userOptional = userRepository.findById(participantId);
		if (userOptional.isPresent()) {
			User user = userOptional.get();
			Optional<Idea> optionalIdea = ideaRepository.findByTeamName(user.getTeamName());
			if (optionalIdea.isPresent()) {
				Idea idea = optionalIdea.get();
				if (idea.getPanelist() != null) {
					idea.getPanelist().setPassword(null);
				}
				return new ResponseEntity<Object>(idea, HttpStatus.OK);
			} else {
				return new ResponseEntity<Object>(
						new ErrorDTO(HttpStatus.NO_CONTENT.toString(), "Idea Not Found", "No Message"),
						HttpStatus.NO_CONTENT);
			}
		} else {
			return new ResponseEntity<Object>(
					new ErrorDTO(HttpStatus.BAD_REQUEST.toString(), "User Not Found", "No Message"),
					HttpStatus.BAD_REQUEST);
		}
	}

	public void deleteAll(String directory) {
		Path uploadPath = Paths.get(directory);
		FileSystemUtils.deleteRecursively(uploadPath.toFile());
	}

	public ResponseEntity<Object> save(MultipartFile file, Integer ideaId) throws IOException {
		Optional<Idea> idea = ideaRepository.findById(ideaId);

		if (idea.isPresent()) {
			Idea updatedIdea = idea.get();
			String uploadDirectory = "uploads/" + updatedIdea.getTeamName();
			Path uploadPath = Paths.get(uploadDirectory);

			deleteAll(uploadDirectory);

			if (!Files.exists(uploadPath)) {
				Files.createDirectories(uploadPath);
			}
			try {
				Files.copy(file.getInputStream(), uploadPath.resolve(file.getOriginalFilename()));
				updatedIdea.setFileName(file.getOriginalFilename());
				ideaRepository.save(updatedIdea);
				return new ResponseEntity<Object>(new CustomResponseDTO(HttpStatus.CREATED.toString(),
						"Uploaded the file successfully: " + file.getOriginalFilename()), HttpStatus.CREATED);
			} catch (Exception e) {
				if (e instanceof FileAlreadyExistsException) {
					return new ResponseEntity<Object>(new ErrorDTO(HttpStatus.BAD_REQUEST.toString(),
							"A file of that name already exists", "No Message"), HttpStatus.BAD_REQUEST);
				}
				return new ResponseEntity<Object>(
						new ErrorDTO(HttpStatus.BAD_REQUEST.toString(), e.getMessage(), "No Message"),
						HttpStatus.BAD_REQUEST);
			}
		} else {
			return new ResponseEntity<Object>(
					new ErrorDTO(HttpStatus.BAD_REQUEST.toString(), "Idea Doesn't Exist", "No Message"),
					HttpStatus.BAD_REQUEST);
		}
	}

	public Resource load(int ideaId) {
		Optional<Idea> ideaOptional = ideaRepository.findById(ideaId);

		if (ideaOptional.isPresent()) {
			Idea idea = ideaOptional.get();
			Path uploadPath = Paths.get("uploads/" + idea.getTeamName());
			try {

				Path file = uploadPath.resolve(idea.getFileName());
				Resource resource = new UrlResource(file.toUri());

				if (resource.exists() || resource.isReadable()) {
					return resource;
				} else {
					throw new RuntimeException("Could not read the file!");
				}
			} catch (MalformedURLException e) {
				throw new RuntimeException("Error: " + e.getMessage());
			}
		}
		return null;
	}

	@Override
	public ResponseEntity<Object> assignIdeaToPanelist(AssignIdeaToPanelistDTO assignIdeaToPanelistDTO) {
		Optional<Idea> ideaOptional = ideaRepository.findById(assignIdeaToPanelistDTO.getIdeaId());
		if (ideaOptional.isPresent()) {
			Optional<User> userOptional = userRepository.findById(assignIdeaToPanelistDTO.getPanelistId());
			if (userOptional.isPresent()) {
				Idea idea = ideaOptional.get();
				User user = userOptional.get();
				idea.setPanelist(user);
				ideaRepository.save(idea);
				idea.getPanelist().setPassword(null);

				return new ResponseEntity<Object>(idea, HttpStatus.OK);

			} else {
				return new ResponseEntity<Object>(
						new ErrorDTO(HttpStatus.BAD_REQUEST.toString(), "Panelist Not Found", "No Message"),
						HttpStatus.BAD_REQUEST);
			}

		} else {
			return new ResponseEntity<Object>(
					new ErrorDTO(HttpStatus.BAD_REQUEST.toString(), "Idea Not Found", "No Message"),
					HttpStatus.BAD_REQUEST);
		}
	}

}
