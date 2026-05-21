package com.servix.exception;

import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends BusinessException {
    public ResourceNotFoundException(String resource, Object id) {
        super(resource + " não encontrado: " + id, HttpStatus.NOT_FOUND);
    }
}
