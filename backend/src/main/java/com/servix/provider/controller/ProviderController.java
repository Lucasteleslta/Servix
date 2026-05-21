package com.servix.provider.controller;

import com.servix.provider.dto.ProviderProfileRequest;
import com.servix.provider.dto.ProviderResponse;
import com.servix.provider.dto.UpdateAvailabilityRequest;
import com.servix.provider.service.ProviderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/providers")
@RequiredArgsConstructor
@Tag(name = "Providers", description = "Perfis de prestadores de serviço")
public class ProviderController {

    private final ProviderService providerService;

    @GetMapping
    @Operation(summary = "Listar todos os providers")
    public Page<ProviderResponse> listAll(@PageableDefault(size = 20) Pageable pageable) {
        return providerService.listAll(pageable);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar provider por ID")
    public ProviderResponse getById(@PathVariable UUID id) {
        return providerService.getById(id);
    }

    @GetMapping("/me")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Meu perfil de provider")
    public ProviderResponse getMyProfile(@AuthenticationPrincipal UserDetails principal) {
        return providerService.getByCurrentUser(principal.getUsername());
    }

    @PutMapping("/me")
    @ResponseStatus(HttpStatus.OK)
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Criar ou atualizar perfil de provider")
    public ProviderResponse createOrUpdate(
            @Valid @RequestBody ProviderProfileRequest req,
            @AuthenticationPrincipal UserDetails principal
    ) {
        return providerService.createOrUpdate(req, principal.getUsername());
    }

    @PatchMapping("/me/availability")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Atualizar disponibilidade")
    public ProviderResponse updateAvailability(
            @RequestBody UpdateAvailabilityRequest req,
            @AuthenticationPrincipal UserDetails principal
    ) {
        return providerService.updateAvailability(req, principal.getUsername());
    }

    @DeleteMapping("/me")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Remover perfil de provider")
    public ResponseEntity<Void> delete(@AuthenticationPrincipal UserDetails principal) {
        providerService.delete(principal.getUsername());
        return ResponseEntity.noContent().build();
    }
}
