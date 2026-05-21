package com.servix.exception;

import org.springframework.http.HttpStatus;

public class EmailAlreadyExistsException extends BusinessException {
    public EmailAlreadyExistsException(String email) {
        super("Email já cadastrado: " + email, HttpStatus.CONFLICT);
    }
}
