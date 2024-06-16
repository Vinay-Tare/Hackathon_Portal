package com.hackathon.hackhthon.portal.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackathon.hackhthon.portal.entities.Idea;

public interface IdeaRepository extends JpaRepository<Idea, Integer> {

	List<Idea> findByPanelistId(int panelistId);

	Optional<Idea> findByTeamName(String teamName);

	boolean existsByTeamName(String teamName);

	boolean existsByTitle(String string);

}
