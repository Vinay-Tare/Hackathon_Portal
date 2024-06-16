package com.hackathon.hackhthon.portal.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hackathon.hackhthon.portal.dto.AssignIdeaToPanelistDTO;
import com.hackathon.hackhthon.portal.dto.ErrorDTO;
import com.hackathon.hackhthon.portal.entities.Idea;
import com.hackathon.hackhthon.portal.services.IdeaService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/ideas")
public class IdeaController {

	@Autowired
	private IdeaService ideaService;

	@PostMapping("/")
	public ResponseEntity<Object> addTeamIdea(@RequestBody Idea idea) {
		return ideaService.addIdea(idea);
	}

	@PostMapping("/update")
	public ResponseEntity<Object> updateTeamIdea(@RequestBody Idea idea) {
		return ideaService.updateIdea(idea);
	}

	@GetMapping("/")
	public ResponseEntity<Object> getAllIdeas() {
		return ideaService.getAllIdeasOrProjectsWithAssignedJudges();
	}

	@GetMapping("/panelist/{panelistId}")
	public ResponseEntity<Object> getIdea(@PathVariable int panelistId) {
		return ideaService.getAssignedIdeas(panelistId);
	}

	@PostMapping("/uploadFile")
	public ResponseEntity<Object> uploadFile(@RequestParam("projectFile") MultipartFile file,
			@RequestParam("ideaId") Integer ideaId) {
		try {
			return ideaService.save(file, ideaId);
		} catch (Exception e) {
			return new ResponseEntity<Object>(new ErrorDTO(HttpStatus.EXPECTATION_FAILED.toString(),
					"Could not upload the file: " + file.getOriginalFilename() + ". Error: " + e.getMessage(),
					"No Message"), HttpStatus.EXPECTATION_FAILED);
		}
	}

	@GetMapping("/files/{ideaId}")
	@ResponseBody
	public ResponseEntity<Resource> getFile(@PathVariable int ideaId) {
		Resource file = ideaService.load(ideaId);
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
				.body(file);
	}

	@GetMapping("/{participantId}")
	@ResponseBody
	public ResponseEntity<Object> getParticipantIdea(@PathVariable int participantId) {
		return ideaService.getParticipantIdea(participantId);
	}

	@PostMapping("/setReview")
	public ResponseEntity<Object> setReviewForIdea(@RequestBody Idea idea) {
		return ideaService.setReview(idea);
	}

	// this handler will assign a panelist to an corresponding idea
	@PostMapping("/assignIdeaToPanelist")
	public ResponseEntity<Object> assignIdeaToPanelist(@RequestBody AssignIdeaToPanelistDTO assignIdeaToPanelistDTO) {
		return ideaService.assignIdeaToPanelist(assignIdeaToPanelistDTO);
	}

}
