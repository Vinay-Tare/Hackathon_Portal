package com.hackathon.hackhthon.portal.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hackathon.hackhthon.portal.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	public Optional<User> findByEmail(String email);

	@Query(value = "SELECT u FROM User u WHERE u.email LIKE %?1% AND u.teamName IS NULL")
	public List<User> searchByEmail(String email);

	public List<User> findByTeamName(String teamName);

	public Optional<User> findByEmail(int id);

	@Query(value = "SELECT u FROM User u WHERE u.teamName LIKE %?1%")
	public List<User> searchByTeamName(String teamName);
	
	public List<User> findByRoles(String roles);
	
	
}
