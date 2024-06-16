package com.hackathon.hackhthon.portal.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackathon.hackhthon.portal.dto.RegisterTeamUserDTO;
import com.hackathon.hackhthon.portal.entities.User;
import com.hackathon.hackhthon.portal.services.UserServiceImplementation;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	UserServiceImplementation userService;

	@PostMapping("/login")
	public ResponseEntity<Object> userLogin(@RequestBody User user) {
		return userService.loginUser(user);
	}

	@PostMapping("/")
	public ResponseEntity<Object> userRegister(@RequestBody User user) {
		return userService.registerUser(user);
	}

	@GetMapping("/search-by-email/{email}")
	public ResponseEntity<Object> searchUserByEmail(@PathVariable(name = "email") String email) {
		return userService.searchByEmail(email);
	}

	@GetMapping("/search-by-teamName/{teamName}")
	public ResponseEntity<Object> searchTeamByName(@PathVariable(name = "teamName") String teamName) {
		return userService.searchTeam(teamName);
	}

	@PostMapping("/teams/addUser")
	public ResponseEntity<Object> userTeamRegister(@RequestBody RegisterTeamUserDTO registerTeamUserDTO) {
		return userService.registerTeamUser(registerTeamUserDTO);
	}

	@GetMapping("/teams/{teamName}")
	public ResponseEntity<Object> getMemebersOfTeam(@PathVariable(name = "teamName") String teamName) {
		return userService.getTeamMembers(teamName);
	}

	// this function will return the list of all panelist present in our database
	@GetMapping("/getAllPanelists")
	public ResponseEntity<Object> getPanelists() {
		return userService.getAllPanelist();
	}

	// this function will return the list of judges present in our database
	@GetMapping("/getAllJudges")
	public ResponseEntity<Object> getJudges() {
		return userService.getAllJudge();
	}

	// This function adds judges and panelist in our database.
	@PostMapping("/addJudgeOrPanelist")
	public ResponseEntity<Object> addJudgeAndPanelist(@RequestBody User user) {
		return userService.saveJudgeOrPanelist(user);
	}

}
