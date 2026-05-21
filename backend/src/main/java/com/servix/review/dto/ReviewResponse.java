package com.servix.review.dto;

import com.servix.domain.entity.Review;

import java.time.OffsetDateTime;
import java.util.UUID;

public record ReviewResponse(
        UUID id,
        UUID requestId,
        UUID reviewerId,
        String reviewerName,
        String reviewerAvatarUrl,
        UUID revieweeId,
        String revieweeName,
        short rating,
        String comment,
        OffsetDateTime createdAt
) {
    public static ReviewResponse from(Review r) {
        return new ReviewResponse(
                r.getId(),
                r.getRequest().getId(),
                r.getReviewer().getId(),
                r.getReviewer().getName(),
                r.getReviewer().getAvatarUrl(),
                r.getReviewee().getId(),
                r.getReviewee().getName(),
                r.getRating(),
                r.getComment(),
                r.getCreatedAt()
        );
    }
}
