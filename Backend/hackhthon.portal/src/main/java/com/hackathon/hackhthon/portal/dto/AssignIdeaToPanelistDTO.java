package com.hackathon.hackhthon.portal.dto;

public class AssignIdeaToPanelistDTO {
	int ideaId;
	int panelistId;

	public AssignIdeaToPanelistDTO() {
		super();
	}

	public AssignIdeaToPanelistDTO(int ideaId, int panelistId) {
		super();
		this.ideaId = ideaId;
		this.panelistId = panelistId;
	}

	public int getIdeaId() {
		return ideaId;
	}

	public void setIdeaId(int ideaId) {
		this.ideaId = ideaId;
	}

	public int getPanelistId() {
		return panelistId;
	}

	public void setPanelistId(int panelistId) {
		this.panelistId = panelistId;
	}

	@Override
	public String toString() {
		return "AssignIdeaToPanelistDTO [ideaId=" + ideaId + ", panelistId=" + panelistId + "]";
	}
}
