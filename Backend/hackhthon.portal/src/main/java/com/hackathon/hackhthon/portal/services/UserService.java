package com.hackathon.hackhthon.portal.services;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.hackathon.hackhthon.portal.dto.RegisterTeamUserDTO;
import com.hackathon.hackhthon.portal.entities.User;

@Service
public interface UserService {
	public ResponseEntity<Object> registerUser(@RequestBody User user);

	public ResponseEntity<Object> searchByEmail(String email);

	public ResponseEntity<Object> registerTeamUser(RegisterTeamUserDTO registerTeamUserDTO);

	public ResponseEntity<Object> getTeamMembers(String teamName);

	public ResponseEntity<Object> getAllPanelist();

	public ResponseEntity<Object> getAllJudge();

	public ResponseEntity<Object> loginUser(User user);

	public ResponseEntity<Object> searchTeam(String teamName);

	public ResponseEntity<Object> saveJudgeOrPanelist(User user);

}
