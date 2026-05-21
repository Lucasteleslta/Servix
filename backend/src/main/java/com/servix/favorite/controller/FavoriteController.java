package com.servix.favorite.controller;

import com.servix.favorite.dto.FavoriteResponse;
import com.servix.favorite.service.FavoriteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@RequestMapping("/favorites")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Favorites", description = "Providers favoritos do cliente")
public class FavoriteController {

    private final FavoriteService favoriteService;

    @GetMapping
    @Operation(summary = "Meus providers favoritos")
    public Page<FavoriteResponse> list(
            @AuthenticationPrincipal UserDetails principal,
            @PageableDefault(size = 20) Pageable pageable
    ) {
        return favoriteService.listMyFavorites(principal.getUsername(), pageable);
    }

    @PostMapping("/{providerId}")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Adicionar provider aos favoritos")
    public FavoriteResponse add(
            @PathVariable UUID providerId,
            @AuthenticationPrincipal UserDetails principal
    ) {
        return favoriteService.add(providerId, principal.getUsername());
    }

    @DeleteMapping("/{providerId}")
    @Operation(summary = "Remover provider dos favoritos")
    public ResponseEntity<Void> remove(
            @PathVariable UUID providerId,
            @AuthenticationPrincipal UserDetails principal
    ) {
        favoriteService.remove(providerId, principal.getUsername());
        return ResponseEntity.noContent().build();
    }
}
