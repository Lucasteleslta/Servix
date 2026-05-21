package com.servix.review.service;

import com.servix.domain.entity.Provider;
import com.servix.domain.entity.Review;
import com.servix.domain.entity.ServiceRequest;
import com.servix.domain.entity.User;
import com.servix.domain.enums.RequestStatus;
import com.servix.domain.repository.ProviderRepository;
import com.servix.domain.repository.ReviewRepository;
import com.servix.domain.repository.ServiceRequestRepository;
import com.servix.domain.repository.UserRepository;
import com.servix.exception.BusinessException;
import com.servix.exception.ResourceNotFoundException;
import com.servix.review.dto.ReviewCreate;
import com.servix.review.dto.ReviewResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ServiceRequestRepository requestRepository;
    private final UserRepository userRepository;
    private final ProviderRepository providerRepository;

    @Transactional(readOnly = true)
    public Page<ReviewResponse> listByProvider(UUID providerId, Pageable pageable) {
        Provider provider = providerRepository.findById(providerId)
                .orElseThrow(() -> new ResourceNotFoundException("Provider", providerId));
        return reviewRepository.findByReviewee(provider.getUser(), pageable).map(ReviewResponse::from);
    }

    @Transactional(readOnly = true)
    public Page<ReviewResponse> listByMe(String email, Pageable pageable) {
        User user = findUser(email);
        return reviewRepository.findByReviewer(user, pageable).map(ReviewResponse::from);
    }

    @Transactional
    public ReviewResponse create(ReviewCreate req, String email) {
        User reviewer = findUser(email);

        ServiceRequest sr = requestRepository.findById(req.requestId())
                .orElseThrow(() -> new ResourceNotFoundException("ServiceRequest", req.requestId()));

        if (!sr.getClient().getId().equals(reviewer.getId())) {
            throw new BusinessException("Only the client of the request can leave a review", HttpStatus.FORBIDDEN);
        }
        if (sr.getStatus() != RequestStatus.COMPLETED) {
            throw new BusinessException("Request must be completed before reviewing", HttpStatus.CONFLICT);
        }
        if (reviewRepository.existsByRequest(sr)) {
            throw new BusinessException("This request already has a review", HttpStatus.CONFLICT);
        }
        if (sr.getProvider() == null) {
            throw new BusinessException("Request has no assigned provider", HttpStatus.CONFLICT);
        }

        Review review = Review.builder()
                .request(sr)
                .reviewer(reviewer)
                .reviewee(sr.getProvider())
                .rating(req.rating())
                .comment(req.comment())
                .build();

        Review saved = reviewRepository.save(review);
        recalculateProviderRating(sr.getProvider());
        return ReviewResponse.from(saved);
    }

    @Transactional
    public void delete(UUID reviewId, String email) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review", reviewId));
        if (!review.getReviewer().getEmail().equals(email)) {
            throw new BusinessException("Not allowed to delete this review", HttpStatus.FORBIDDEN);
        }
        User reviewee = review.getReviewee();
        reviewRepository.delete(review);
        recalculateProviderRating(reviewee);
    }

    private void recalculateProviderRating(User providerUser) {
        providerRepository.findByUser(providerUser).ifPresent(provider -> {
            Page<Review> reviews = reviewRepository.findByReviewee(providerUser, Pageable.unpaged());
            long total = reviews.getTotalElements();
            if (total == 0) {
                provider.setRating(BigDecimal.ZERO);
                provider.setTotalReviews(0);
            } else {
                double avg = reviews.stream().mapToInt(Review::getRating).average().orElse(0);
                provider.setRating(BigDecimal.valueOf(avg).setScale(2, RoundingMode.HALF_UP));
                provider.setTotalReviews((int) total);
            }
            providerRepository.save(provider);
        });
    }

    private User findUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", email));
    }
}
