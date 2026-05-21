package com.servix.servicerequest.controller;

import com.servix.servicerequest.dto.*;
import com.servix.servicerequest.service.ServiceRequestService;
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

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/service-requests")
@RequiredArgsConstructor
@Tag(name = "Service Requests", description = "Pedidos de serviço e propostas")
public class ServiceRequestController {

    private final ServiceRequestService service;

    @GetMapping
    @Operation(summary = "Listar pedidos abertos (PENDING), filtrável por categoria")
    public Page<ServiceRequestResponse> listOpen(
            @RequestParam(required = false) String category,
            @PageableDefault(size = 20) Pageable pageable
    ) {
        return service.listOpen(category, pageable);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar pedido por ID")
    public ServiceRequestResponse getById(@PathVariable UUID id) {
        return service.getById(id);
    }

    @GetMapping("/my")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Meus pedidos como cliente")
    public Page<ServiceRequestResponse> myRequests(
            @AuthenticationPrincipal UserDetails principal,
            @PageableDefault(size = 20) Pageable pageable
    ) {
        return service.listMyRequests(principal.getUsername(), pageable);
    }

    @GetMapping("/assigned")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Pedidos atribuídos a mim como provider")
    public Page<ServiceRequestResponse> assigned(
            @AuthenticationPrincipal UserDetails principal,
            @PageableDefault(size = 20) Pageable pageable
    ) {
        return service.listAssignedToMe(principal.getUsername(), pageable);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Criar pedido de serviço")
    public ServiceRequestResponse create(
            @Valid @RequestBody ServiceRequestCreate req,
            @AuthenticationPrincipal UserDetails principal
    ) {
        return service.create(req, principal.getUsername());
    }

    @PatchMapping("/{id}/status")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Atualizar status do pedido")
    public ServiceRequestResponse updateStatus(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateStatusRequest req,
            @AuthenticationPrincipal UserDetails principal
    ) {
        return service.updateStatus(id, req, principal.getUsername());
    }

    @DeleteMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Deletar pedido (somente PENDING)")
    public ResponseEntity<Void> delete(
            @PathVariable UUID id,
            @AuthenticationPrincipal UserDetails principal
    ) {
        service.delete(id, principal.getUsername());
        return ResponseEntity.noContent().build();
    }

    // --- Proposals ---

    @GetMapping("/{id}/proposals")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Listar propostas do pedido (somente o cliente)")
    public List<ProposalResponse> listProposals(
            @PathVariable UUID id,
            @AuthenticationPrincipal UserDetails principal
    ) {
        return service.listProposals(id, principal.getUsername());
    }

    @PostMapping("/{id}/proposals")
    @ResponseStatus(HttpStatus.CREATED)
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Enviar proposta para um pedido (provider)")
    public ProposalResponse submitProposal(
            @PathVariable UUID id,
            @Valid @RequestBody ProposalCreate req,
            @AuthenticationPrincipal UserDetails principal
    ) {
        return service.submitProposal(id, req, principal.getUsername());
    }

    @PostMapping("/{id}/proposals/{proposalId}/accept")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Aceitar proposta (cliente) — rejeita as demais automaticamente")
    public ProposalResponse acceptProposal(
            @PathVariable UUID id,
            @PathVariable UUID proposalId,
            @AuthenticationPrincipal UserDetails principal
    ) {
        return service.acceptProposal(id, proposalId, principal.getUsername());
    }
}
