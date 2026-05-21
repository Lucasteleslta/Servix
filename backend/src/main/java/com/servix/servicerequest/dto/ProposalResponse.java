package com.servix.servicerequest.dto;

import com.servix.domain.entity.Proposal;
import com.servix.domain.enums.ProposalStatus;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

public record ProposalResponse(
        UUID id,
        UUID requestId,
        UUID providerId,
        String providerName,
        String providerAvatarUrl,
        BigDecimal price,
        String estimatedDuration,
        String message,
        ProposalStatus status,
        OffsetDateTime createdAt
) {
    public static ProposalResponse from(Proposal p) {
        return new ProposalResponse(
                p.getId(),
                p.getRequest().getId(),
                p.getProvider().getId(),
                p.getProvider().getName(),
                p.getProvider().getAvatarUrl(),
                p.getPrice(),
                p.getEstimatedDuration(),
                p.getMessage(),
                p.getStatus(),
                p.getCreatedAt()
        );
    }
}
