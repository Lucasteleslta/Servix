package com.servix.domain.repository;

import com.servix.domain.entity.Review;
import com.servix.domain.entity.ServiceRequest;
import com.servix.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ReviewRepository extends JpaRepository<Review, UUID> {

    Page<Review> findByReviewee(User reviewee, Pageable pageable);

    Page<Review> findByReviewer(User reviewer, Pageable pageable);

    Optional<Review> findByRequest(ServiceRequest request);

    boolean existsByRequest(ServiceRequest request);
}
