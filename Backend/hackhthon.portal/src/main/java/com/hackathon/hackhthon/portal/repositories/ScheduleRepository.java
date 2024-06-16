package com.hackathon.hackhthon.portal.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackathon.hackhthon.portal.entities.Idea;
import com.hackathon.hackhthon.portal.entities.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {

	Optional<Schedule> findByName(String name);

	Optional<Schedule> findByProject(Idea project);

}
