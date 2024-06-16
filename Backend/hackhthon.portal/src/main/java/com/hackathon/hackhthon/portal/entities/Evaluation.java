package com.hackathon.hackhthon.portal.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tblEvaluation")
public class Evaluation {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false)
	private int id;

	@ManyToOne
	@JoinColumn(name = "ideaId", referencedColumnName = "id", nullable = false)
	private Idea idea;

	@ManyToOne
	@JoinColumn(name = "judgeId", referencedColumnName = "id", nullable = false)
	private User judge;

	@Column(name = "technicalDifficulty")
	private int technicalDifficulty;

	@Column(name = "remark")
	private String remark;

	@Column(name = "wowFactor")
	private int wowFactor;

	@Column(name = "futurePlans")
	private int futurePlans;

	public Evaluation() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Idea getIdea() {
		return idea;
	}

	public void setIdea(Idea idea) {
		this.idea = idea;
	}

	public User getJudge() {
		return judge;
	}

	public void setJudge(User judge) {
		this.judge = judge;
	}

	public int getTechnicalDifficulty() {
		return technicalDifficulty;
	}

	public void setTechnicalDifficulty(int technicalDifficulty) {
		this.technicalDifficulty = technicalDifficulty;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public int getWowFactor() {
		return wowFactor;
	}

	public void setWowFactor(int wowFactor) {
		this.wowFactor = wowFactor;
	}

	public int getFuturePlans() {
		return futurePlans;
	}

	public void setFuturePlans(int futurePlans) {
		this.futurePlans = futurePlans;
	}

	@Override
	public String toString() {
		return "Evaluation [id=" + id + ", idea=" + idea + ", judge=" + judge + ", technicalDifficulty="
				+ technicalDifficulty + ", remark=" + remark + ", wowFactor=" + wowFactor + ", futurePlans="
				+ futurePlans + "]";
	}

}
