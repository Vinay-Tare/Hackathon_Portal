package com.hackathon.hackhthon.portal.services;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hackathon.hackhthon.portal.entities.Domain;

@Service
public interface DomainService {

	public ResponseEntity<Object> createDomain(Domain domain);

	public ResponseEntity<Object> getAllDomain();

}
