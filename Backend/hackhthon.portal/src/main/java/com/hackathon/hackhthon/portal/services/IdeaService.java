
package com.hackathon.hackhthon.portal.services;

import java.io.IOException;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hackathon.hackhthon.portal.dto.AssignIdeaToPanelistDTO;
import com.hackathon.hackhthon.portal.entities.Idea;

@Service
public interface IdeaService {

	public ResponseEntity<Object> addIdea(Idea idea);

	public ResponseEntity<Object> getAssignedIdeas(int panelistId);

	public ResponseEntity<Object> getParticipantIdea(int participantId);

	public ResponseEntity<Object> save(MultipartFile file, Integer ideaId) throws IOException;

	public void deleteAll(String directory);

	public Resource load(int ideaId);

	public ResponseEntity<Object> assignIdeaToPanelist(AssignIdeaToPanelistDTO assignIdeaToPanelistDTO);

	public ResponseEntity<Object> setReview(Idea idea);

	public ResponseEntity<Object> getAllIdeasOrProjectsWithAssignedJudges();

	public ResponseEntity<Object> updateIdea(Idea idea);
}
