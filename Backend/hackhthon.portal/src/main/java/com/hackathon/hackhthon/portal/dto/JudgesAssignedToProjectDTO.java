package com.hackathon.hackhthon.portal.dto;

import java.util.List;

import com.hackathon.hackhthon.portal.entities.Idea;
import com.hackathon.hackhthon.portal.entities.User;

public class JudgesAssignedToProjectDTO {
	private Idea idea;
	private List<User> judges;

	public JudgesAssignedToProjectDTO() {
		super();
	}

	public JudgesAssignedToProjectDTO(Idea idea, List<User> judges) {
		super();
		this.idea = idea;
		this.judges = judges;
	}

	public Idea getIdea() {
		return idea;
	}

	public void setIdea(Idea idea) {
		this.idea = idea;
	}

	public List<User> getJudges() {
		return judges;
	}

	public void setJudges(List<User> judges) {
		this.judges = judges;
	}

	@Override
	public String toString() {
		return "JudgesAssignedToProjectDTO [idea=" + idea + ", judges=" + judges + "]";
	}

}
