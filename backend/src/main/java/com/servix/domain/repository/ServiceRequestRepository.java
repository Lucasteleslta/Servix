package com.servix.domain.repository;

import com.servix.domain.entity.ServiceRequest;
import com.servix.domain.entity.User;
import com.servix.domain.enums.RequestStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, UUID> {

    Page<ServiceRequest> findByClient(User client, Pageable pageable);

    Page<ServiceRequest> findByProvider(User provider, Pageable pageable);

    @Query("SELECT sr FROM ServiceRequest sr WHERE sr.status = :status AND (:category IS NULL OR sr.category = :category)")
    Page<ServiceRequest> findByStatusAndCategory(
            @Param("status") RequestStatus status,
            @Param("category") String category,
            Pageable pageable
    );
}
