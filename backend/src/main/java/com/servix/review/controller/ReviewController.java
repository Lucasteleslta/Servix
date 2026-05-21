package com.servix.review.controller;

import com.servix.review.dto.ReviewCreate;
import com.servix.review.dto.ReviewResponse;
import com.servix.review.service.ReviewService;
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
@RequestMapping("/reviews")
@RequiredArgsConstructor
@Tag(name = "Reviews", description = "Avaliações de prestadores de serviço")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/provider/{providerId}")
    @Operation(summary = "Listar avaliações de um provider")
    public Page<ReviewResponse> listByProvider(
            @PathVariable UUID providerId,
            @PageableDefault(size = 20) Pageable pageable
    ) {
        return reviewService.listByProvider(providerId, pageable);
    }

    @GetMapping("/my")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Avaliações que eu escrevi")
    public Page<ReviewResponse> myReviews(
            @AuthenticationPrincipal UserDetails principal,
            @PageableDefault(size = 20) Pageable pageable
    ) {
        return reviewService.listByMe(principal.getUsername(), pageable);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Criar avaliação (cliente, pedido COMPLETED, uma por pedido)")
    public ReviewResponse create(
            @Valid @RequestBody ReviewCreate req,
            @AuthenticationPrincipal UserDetails principal
    ) {
        return reviewService.create(req, principal.getUsername());
    }

    @DeleteMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Deletar avaliação (somente o autor)")
    public ResponseEntity<Void> delete(
            @PathVariable UUID id,
            @AuthenticationPrincipal UserDetails principal
    ) {
        reviewService.delete(id, principal.getUsername());
        return ResponseEntity.noContent().build();
    }
}
