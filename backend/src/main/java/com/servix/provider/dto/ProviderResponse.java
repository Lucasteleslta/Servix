package com.servix.provider.dto;

import com.servix.domain.entity.Provider;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

public record ProviderResponse(
        UUID id,
        UUID userId,
        String userName,
        String userEmail,
        String avatarUrl,
        String category,
        String description,
        BigDecimal hourlyRate,
        BigDecimal rating,
        Integer totalReviews,
        Double latitude,
        Double longitude,
        boolean available,
        OffsetDateTime createdAt
) {
    public static ProviderResponse from(Provider p) {
        return new ProviderResponse(
                p.getId(),
                p.getUser().getId(),
                p.getUser().getName(),
                p.getUser().getEmail(),
                p.getUser().getAvatarUrl(),
                p.getCategory(),
                p.getDescription(),
                p.getHourlyRate(),
                p.getRating(),
                p.getTotalReviews(),
                p.getLatitude(),
                p.getLongitude(),
                p.isAvailable(),
                p.getCreatedAt()
        );
    }
}
