package com.servix.auth.controller;

import com.servix.auth.dto.AuthResponse;
import com.servix.auth.dto.LoginRequest;
import com.servix.auth.dto.RefreshTokenRequest;
import com.servix.auth.dto.RegisterRequest;
import com.servix.auth.dto.SetRoleRequest;
import com.servix.auth.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Auth", description = "Autenticação e gerenciamento de conta")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Criar conta")
    public AuthResponse register(@Valid @RequestBody RegisterRequest req) {
        return authService.register(req);
    }

    @PostMapping("/login")
    @Operation(summary = "Login")
    public AuthResponse login(@Valid @RequestBody LoginRequest req) {
        return authService.login(req);
    }

    @PostMapping("/refresh")
    @Operation(summary = "Renovar access token")
    public AuthResponse refresh(@Valid @RequestBody RefreshTokenRequest req) {
        return authService.refresh(req);
    }

    @PatchMapping("/role")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Definir papel (CLIENT ou PROVIDER)")
    public AuthResponse setRole(
            @Valid @RequestBody SetRoleRequest req,
            @AuthenticationPrincipal UserDetails principal
    ) {
        return authService.setRole(req, principal.getUsername());
    }

    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Logout (revoga refresh token)")
    public ResponseEntity<Void> logout(@AuthenticationPrincipal UserDetails principal) {
        authService.logout(principal.getUsername());
        return ResponseEntity.noContent().build();
    }
}
