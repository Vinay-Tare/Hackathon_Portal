package com.hackathon.hackhthon.portal.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackathon.hackhthon.portal.entities.Domain;

public interface DomainRepository  extends JpaRepository<Domain, Integer>{

	Optional<Domain> findByNameIgnoreCase(String name);

}
