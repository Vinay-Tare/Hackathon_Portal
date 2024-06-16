package com.hackathon.hackhthon.portal.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tblIdea")
public class Idea {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false)
	private int id;

	@Column(name = "title", unique = true, nullable = false)
	private String title;

	@Column(name = "description", nullable = false)
	private String description;

	@Column(name = "status", nullable = false)
	private String status;

	@Column(name = "reviewComment", nullable = false)
	private String reviewComment;

	@ManyToOne
	@JoinColumn(name = "domainId", referencedColumnName = "id", nullable = false)
	private Domain domain;

	@Column(name = "teamName", unique = true, nullable = false)
	private String teamName;

	@OneToOne
	@JoinColumn(name = "panelistId", referencedColumnName = "id")
	private User panelist;

	@Column(name = "fileName")
	private String fileName;

	public Idea() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getReviewComment() {
		return reviewComment;
	}

	public void setReviewComment(String reviewComment) {
		this.reviewComment = reviewComment;
	}

	public Domain getDomain() {
		return domain;
	}

	public void setDomain(Domain domain) {
		this.domain = domain;
	}

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}

	public User getPanelist() {
		return panelist;
	}

	public void setPanelist(User panelist) {
		this.panelist = panelist;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	@Override
	public String toString() {
		return "Idea [id=" + id + ", title=" + title + ", description=" + description + ", status=" + status
				+ ", reviewComment=" + reviewComment + ", domain=" + domain + ", teamName=" + teamName + ", panelist="
				+ panelist + ", fileName=" + fileName + "]";
	}
}
