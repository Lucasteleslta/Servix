package com.servix.domain.repository;

import com.servix.domain.entity.Proposal;
import com.servix.domain.entity.ServiceRequest;
import com.servix.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProposalRepository extends JpaRepository<Proposal, UUID> {

    List<Proposal> findByRequest(ServiceRequest request);

    List<Proposal> findByProvider(User provider);

    Optional<Proposal> findByRequestAndProvider(ServiceRequest request, User provider);

    boolean existsByRequestAndProvider(ServiceRequest request, User provider);
}
