package com.hackathon.hackhthon.portal.services;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.hackathon.hackhthon.portal.dto.ErrorDTO;
import com.hackathon.hackhthon.portal.dto.RegisterTeamUserDTO;
import com.hackathon.hackhthon.portal.dto.TeamNameDTO;
import com.hackathon.hackhthon.portal.entities.User;
import com.hackathon.hackhthon.portal.repositories.UserRepository;

@Service
public class UserServiceImplementation implements UserService {

	@Autowired
	UserRepository userRepository;
	@Autowired
	private JavaMailSender emailSender;

	public static String getMd5(String input) {
		try {

			// Static getInstance method is called with hashing MD5
			MessageDigest md = MessageDigest.getInstance("MD5");

			// digest() method is called to calculate message digest
			// of an input digest() return array of byte
			byte[] messageDigest = md.digest(input.getBytes());

			// Convert byte array into signum representation
			BigInteger no = new BigInteger(1, messageDigest);

			// Convert message digest into hex value
			String hashtext = no.toString(16);
			while (hashtext.length() < 32) {
				hashtext = "0" + hashtext;
			}
			return hashtext;
		}

		// For specifying wrong message digest algorithms
		catch (NoSuchAlgorithmException e) {
			throw new RuntimeException(e);
		}
	}

	public ResponseEntity<Object> registerUser(User user) {
		Optional<User> foundUser = userRepository.findByEmail(user.getEmail());
		if (foundUser.isPresent()) {
			ErrorDTO error = new ErrorDTO(HttpStatus.BAD_REQUEST.toString(), "User Already Exists", "No Message");
			return new ResponseEntity<Object>(error, HttpStatus.BAD_REQUEST);
		} else {
			user.setRoles("PARTICIPANT");
			user.setPassword(getMd5(user.getPassword()));
			return new ResponseEntity<Object>(userRepository.save(user), HttpStatus.CREATED);
		}
	}

	public ResponseEntity<Object> searchByEmail(String email) {
		List<User> users = userRepository.searchByEmail(email);
		users = users.stream().filter((u) -> Arrays.asList(u.getRoles().split(",")).contains("PARTICIPANT"))
				.collect(Collectors.toList());
		return new ResponseEntity<Object>(users, HttpStatus.OK);
	}

	public ResponseEntity<Object> searchTeam(String teamName) {
		List<User> users = userRepository.searchByTeamName(teamName);
		Map<String, Integer> count = new HashMap<String, Integer>();

//		Get Unique Team Names With Members Less Than 4
		users.stream().forEach((t) -> count.put(t.getTeamName(), count.getOrDefault(t.getTeamName(), 0) + 1));
		users = users.stream().filter((t) -> count.get(t.getTeamName()) < 4).collect(Collectors.toList());
		List<TeamNameDTO> teamNamesDTOList = new ArrayList<TeamNameDTO>();
		for (User user : users) {
			teamNamesDTOList.add(new TeamNameDTO(user.getTeamName()));
		}

//		Get Unique Team Names
		teamNamesDTOList = teamNamesDTOList.stream().distinct().collect(Collectors.toList());

		return new ResponseEntity<Object>(teamNamesDTOList, HttpStatus.OK);
	}

	public ResponseEntity<Object> getTeamMembers(String teamName) {
		return new ResponseEntity<Object>(userRepository.findByTeamName(teamName), HttpStatus.OK);
	}

	public ResponseEntity<Object> registerTeamUser(RegisterTeamUserDTO registerTeamUserDTO) {
		String teamName = registerTeamUserDTO.getTeamName();
		List<User> teamMembers = userRepository.findByTeamName(teamName);
		if (teamMembers.size() < 4) {
			int userId = registerTeamUserDTO.getUserId();
			Optional<User> userOp = userRepository.findById(userId);
			if (userOp.isEmpty()) {
				ErrorDTO error = new ErrorDTO(HttpStatus.BAD_REQUEST.toString(), "User To Be Added In Team Not Found",
						"No Message");
				return new ResponseEntity<Object>(error, HttpStatus.BAD_REQUEST);
			} else {
				User user = userOp.get();
				user.setTeamName(teamName);
				User savedUser = userRepository.save(user);
				savedUser.setPassword(null);
				return new ResponseEntity<Object>(savedUser, HttpStatus.OK);
			}
		} else {
			ErrorDTO error = new ErrorDTO(HttpStatus.BAD_REQUEST.toString(),
					"Team Already Exists And Has 4 Members (Team Is Full)", "No Message");
			return new ResponseEntity<Object>(error, HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<Object> loginUser(User user) {
		Optional<User> userOptional = userRepository.findByEmail(user.getEmail());

		if (userOptional.isPresent()) {
			User existingUser = userOptional.get();

			if (getMd5(user.getPassword()).equals(existingUser.getPassword())) {
				existingUser.setPassword(null);
				return new ResponseEntity<Object>(existingUser, HttpStatus.OK);
			} else {
				ErrorDTO error = new ErrorDTO(HttpStatus.BAD_REQUEST.toString(), "Invalid Password", "No Message");
				return new ResponseEntity<Object>(error, HttpStatus.BAD_REQUEST);
			}
		} else {
			ErrorDTO error = new ErrorDTO(HttpStatus.BAD_REQUEST.toString(), "User Doesn't Exist", "No Message");
			return new ResponseEntity<Object>(error, HttpStatus.BAD_REQUEST);
		}
	}
	// this function will return the list of all the panelist

	@Override
	public ResponseEntity<Object> getAllPanelist() {
		List<User> users = userRepository.findAll();
		List<User> panelists = users.stream().filter((u) -> Arrays.asList(u.getRoles().split(",")).contains("PANELIST"))
				.collect(Collectors.toList());
		panelists.stream().forEach(p -> p.setPassword(null));
		if (panelists.isEmpty()) {
			return new ResponseEntity<Object>(Collections.emptyList(), HttpStatus.OK);
		}
		return new ResponseEntity<Object>(panelists, HttpStatus.OK);
	}

	// this function will return the list of names of all judges present in our
	// dataBase
	@Override
	public ResponseEntity<Object> getAllJudge() {
		List<User> users = userRepository.findAll();
		List<User> judges = users.stream().filter((u) -> Arrays.asList(u.getRoles().split(",")).contains("JUDGE"))
				.collect(Collectors.toList());
		judges.stream().forEach(j -> j.setPassword(null));
		if (judges.isEmpty()) {
			return new ResponseEntity<Object>(Collections.emptyList(), HttpStatus.OK);
		}
		return new ResponseEntity<Object>(judges, HttpStatus.OK);
	}

	public void mailForUpgradePanelistToJudge(User user) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(user.getEmail());
		message.setSubject("Your account has been upgraded to Hackathon judging panel!");
		message.setText(
				"Hello " + user.getName() + ",\n\n" + "Your account has been upgraded to Hackathon judging panel! . "
						+ "You can now log in using your email address and the password: " + user.getPassword()
						+ ".\n\n" + "Thanks,\nThe Hackathon Team");
		emailSender.send(message);
	}

	public void mailToAddedPanelistOrJudge(User user, String userPassword) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(user.getEmail());
		List<String> userRoles = Arrays.asList(user.getRoles().split(","));
		String role = userRoles.contains("JUDGE") ? "Judge" : userRoles.contains("PANELIST") ? "Panelist" : "";
		message.setSubject("Your account has been created for " + role + "  Panel");
		message.setText("Hello " + user.getName() + ",\n\n" + "Your account has been created for the hackathon " + role
				+ " panel. " + "You can now log in using your email address and the password: " + userPassword + ".\n\n"
				+ "Thanks,\nThe Hackathon Team");
		emailSender.send(message);
	}

	public ResponseEntity<Object> saveJudgeOrPanelist(User user) {

		Optional<User> userOptional = userRepository.findByEmail(user.getEmail());
		if (userOptional.isPresent()) {
			User foundUser = userOptional.get();
			boolean isPanelist = Arrays.asList(foundUser.getRoles().split(",")).contains("PANELIST")
					&& !Arrays.asList(foundUser.getRoles().split(",")).contains("JUDGE");
			if (isPanelist) {
				foundUser.setRoles("PANELIST,JUDGE");
				User savedUser = userRepository.save(foundUser);
				savedUser.setPassword(null);
//				mailForUpgradePanelistToJudge(user);
				return new ResponseEntity<Object>(savedUser, HttpStatus.CREATED);
			} else {
				ErrorDTO error = new ErrorDTO(HttpStatus.BAD_REQUEST.toString(), "User Already Exists", "No Message");
				return new ResponseEntity<Object>(error, HttpStatus.BAD_REQUEST);
			}
		} else {
			String userPassword = user.getPassword();
			user.setRoles(user.getRoles());
			user.setPassword(getMd5(user.getPassword()));
			User savedUser = userRepository.save(user);
			savedUser.setPassword(null);
//			mailToAddedPanelistOrJudge(user, userPassword);
			return new ResponseEntity<Object>(savedUser, HttpStatus.CREATED);
		}
	}
}
