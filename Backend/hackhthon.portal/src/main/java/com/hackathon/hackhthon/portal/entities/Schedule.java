package com.hackathon.hackhthon.portal.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tblSchedule")
public class Schedule {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false)
	private int id;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "startTime", nullable = false)
	private LocalDateTime startTime;

	@Column(name = "endTime", nullable = false)
	private LocalDateTime endTime;

	@OneToOne
	@JoinColumn(name = "projectId", referencedColumnName = "id")
	Idea project;

	public Schedule() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public LocalDateTime getStartTime() {
		return startTime;
	}

	public void setStartTime(LocalDateTime startTime) {
		this.startTime = startTime;
	}

	public LocalDateTime getEndTime() {
		return endTime;
	}

	public void setEndTime(LocalDateTime endTime) {
		this.endTime = endTime;
	}

	public Idea getProject() {
		return project;
	}

	public void setProject(Idea project) {
		this.project = project;
	}

	@Override
	public String toString() {
		return "Schedule [id=" + id + ", name=" + name + ", startTime=" + startTime + ", endTime=" + endTime
				+ ", project=" + project + "]";
	}

}
