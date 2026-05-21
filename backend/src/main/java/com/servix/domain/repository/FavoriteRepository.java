package com.servix.domain.repository;

import com.servix.domain.entity.Favorite;
import com.servix.domain.entity.Provider;
import com.servix.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface FavoriteRepository extends JpaRepository<Favorite, UUID> {

    Page<Favorite> findByClient(User client, Pageable pageable);

    Optional<Favorite> findByClientAndProvider(User client, Provider provider);

    boolean existsByClientAndProvider(User client, Provider provider);
}
