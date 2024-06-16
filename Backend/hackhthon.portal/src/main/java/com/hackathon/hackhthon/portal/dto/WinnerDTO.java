package com.hackathon.hackhthon.portal.dto;

import java.util.List;

public class WinnerDTO {
	int id;
	String teamName;
	String position;
	int no;
	String suffix;
	List<String> team;

	public WinnerDTO() {
		super();
	}

	public WinnerDTO(int id, String teamName, String position, int no, String suffix, List<String> team) {
		super();
		this.id = id;
		this.teamName = teamName;
		this.position = position;
		this.no = no;
		this.suffix = suffix;
		this.team = team;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}

	public String getSuffix() {
		return suffix;
	}

	public void setSuffix(String suffix) {
		this.suffix = suffix;
	}

	public List<String> getTeam() {
		return team;
	}

	public void setTeam(List<String> team) {
		this.team = team;
	}

	@Override
	public String toString() {
		return "WinnerDTO [id=" + id + ", teamName=" + teamName + ", position=" + position + ", no=" + no + ", suffix="
				+ suffix + ", team=" + team + "]";
	}

}
