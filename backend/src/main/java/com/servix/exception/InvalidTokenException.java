package com.servix.exception;

import org.springframework.http.HttpStatus;

public class InvalidTokenException extends BusinessException {
    public InvalidTokenException() {
        super("Token inválido ou expirado", HttpStatus.UNAUTHORIZED);
    }
}
