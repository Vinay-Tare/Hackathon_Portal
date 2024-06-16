package com.hackathon.hackhthon.portal.dto;

public class RegisterTeamUserDTO {

	private String teamName;
	int userId;

	public RegisterTeamUserDTO() {
		super();
	}

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "RegisterTeamUserDTO [teamName=" + teamName + ", userId=" + userId + "]";
	}
}
