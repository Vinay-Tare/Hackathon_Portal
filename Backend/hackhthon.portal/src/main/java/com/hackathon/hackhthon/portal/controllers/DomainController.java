package com.hackathon.hackhthon.portal.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackathon.hackhthon.portal.entities.Domain;
import com.hackathon.hackhthon.portal.services.DomainServiceImplementation;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/domain")
public class DomainController {
	
	@Autowired
	DomainServiceImplementation domainService;

	@PostMapping("")
	public ResponseEntity<Object> addDomain(@RequestBody Domain domain) {
		return domainService.createDomain(domain);
	}
	
	@GetMapping("")
	public ResponseEntity<Object> fetchAllDomain() {
		return domainService.getAllDomain();
	}
}
