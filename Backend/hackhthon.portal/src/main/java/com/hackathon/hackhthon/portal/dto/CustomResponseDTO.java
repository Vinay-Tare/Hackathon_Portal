package com.hackathon.hackhthon.portal.dto;

import java.time.LocalDateTime;

public class CustomResponseDTO {

	private String status;

	private String message;

	private LocalDateTime timestamp;

	public CustomResponseDTO() {
		super();
	}

	public CustomResponseDTO(String status, String message) {
		super();
		this.status = status;
		this.message = message;
		this.timestamp = LocalDateTime.now();
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "CustomResponseDTO [status=" + status + ", timestamp=" + timestamp + ", message=" + message + "]";
	}

}