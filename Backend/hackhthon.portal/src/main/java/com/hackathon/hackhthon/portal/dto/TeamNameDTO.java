package com.hackathon.hackhthon.portal.dto;

import java.util.Objects;

public class TeamNameDTO {
	String teamName;

	public TeamNameDTO() {
		super();
	}

	public TeamNameDTO(String teamName) {
		super();
		this.teamName = teamName;
	}

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}

	@Override
	public int hashCode() {
		return Objects.hash(teamName);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TeamNameDTO other = (TeamNameDTO) obj;
		return Objects.equals(teamName, other.teamName);
	}

	@Override
	public String toString() {
		return "TeamNameDTO [teamName=" + teamName + "]";
	}

}
