package com.hackathon.hackhthon.portal.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hackathon.hackhthon.portal.dto.ErrorDTO;
import com.hackathon.hackhthon.portal.entities.Domain;
import com.hackathon.hackhthon.portal.repositories.DomainRepository;

@Service
public class DomainServiceImplementation implements DomainService {

	@Autowired
	DomainRepository domainRepository;

	public ResponseEntity<Object> createDomain(Domain domain) {
		Optional<Domain> domainOptional = domainRepository.findByNameIgnoreCase(domain.getName());
		if (domainOptional.isPresent()) {
			ErrorDTO error = new ErrorDTO(HttpStatus.BAD_REQUEST.toString(), "Domain Already Exists!", "No Message");
			return new ResponseEntity<Object>(error, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<Object>(domainRepository.save(domain), HttpStatus.CREATED);
	}

	public ResponseEntity<Object> getAllDomain() {
		return new ResponseEntity<Object>(domainRepository.findAll(), HttpStatus.OK);
	}
}
