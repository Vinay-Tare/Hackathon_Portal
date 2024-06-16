package com.hackathon.hackhthon.portal.dto;

import java.util.List;

public class AssignJudgesDTO {
	int projectId;
	List<Integer> listOfJudgeId;

	public AssignJudgesDTO() {
		super();
	}

	public AssignJudgesDTO(int projectId, List<Integer> listOfJudgeId) {
		super();
		this.projectId = projectId;
		this.listOfJudgeId = listOfJudgeId;
	}

	public final int getProjectId() {
		return projectId;
	}

	public final void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	public final List<Integer> getListOfJudgeId() {
		return listOfJudgeId;
	}

	public final void setListOfJudgeId(List<Integer> listOfJudgeId) {
		this.listOfJudgeId = listOfJudgeId;
	}

	@Override
	public String toString() {
		return "AssignJudgesDTO [projectId=" + projectId + ", listOfJudgeId=" + listOfJudgeId + "]";
	}
}
