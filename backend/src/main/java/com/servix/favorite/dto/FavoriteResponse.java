package com.servix.favorite.dto;

import com.servix.domain.entity.Favorite;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

public record FavoriteResponse(
        UUID id,
        UUID providerId,
        String providerName,
        String providerAvatarUrl,
        String category,
        BigDecimal hourlyRate,
        BigDecimal rating,
        boolean available,
        OffsetDateTime favoritedAt
) {
    public static FavoriteResponse from(Favorite f) {
        return new FavoriteResponse(
                f.getId(),
                f.getProvider().getId(),
                f.getProvider().getUser().getName(),
                f.getProvider().getUser().getAvatarUrl(),
                f.getProvider().getCategory(),
                f.getProvider().getHourlyRate(),
                f.getProvider().getRating(),
                f.getProvider().isAvailable(),
                f.getCreatedAt()
        );
    }
}
