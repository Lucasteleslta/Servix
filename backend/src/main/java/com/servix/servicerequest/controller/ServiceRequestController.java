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
@RequestMapping("/requests")
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

    @GetMapping("/my")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Meus pedidos como cliente")
    public Page<ServiceRequestResponse> myRequests(
            @AuthenticationPrincipal UserDetails principal,
            @PageableDefault(size = 20) Pageable pageable
    ) {
        return service.listMyRequests(principal.getUsername(), pageable);
    }

    @GetMapping("/received")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Pedidos recebidos por mim como prestador")
    public Page<ServiceRequestResponse> received(
            @AuthenticationPrincipal UserDetails principal,
            @PageableDefault(size = 20) Pageable pageable
    ) {
        return service.listReceived(principal.getUsername(), pageable);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar pedido por ID")
    public ServiceRequestResponse getById(@PathVariable UUID id) {
        return service.getById(id);
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

    @PatchMapping("/{id}/cancel")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Cancelar pedido (cliente ou prestador atribuído)")
    public ServiceRequestResponse cancel(
            @PathVariable UUID id,
            @AuthenticationPrincipal UserDetails principal
    ) {
        return service.cancel(id, principal.getUsername());
    }

    @PatchMapping("/{id}/accept")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Aceitar pedido (prestador se atribui ao pedido)")
    public ServiceRequestResponse accept(
            @PathVariable UUID id,
            @AuthenticationPrincipal UserDetails principal
    ) {
        return service.accept(id, principal.getUsername());
    }

    @PatchMapping("/{id}/complete")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Marcar pedido como concluído (prestador atribuído)")
    public ServiceRequestResponse complete(
            @PathVariable UUID id,
            @AuthenticationPrincipal UserDetails principal
    ) {
        return service.complete(id, principal.getUsername());
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
