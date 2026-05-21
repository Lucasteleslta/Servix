package com.servix.domain.repository;

import com.servix.domain.entity.Provider;
import com.servix.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ProviderRepository extends JpaRepository<Provider, UUID> {
    Optional<Provider> findByUser(User user);
    boolean existsByUser(User user);
}
