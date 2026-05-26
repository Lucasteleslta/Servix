package com.servix.domain.repository;

import com.servix.domain.entity.Provider;
import com.servix.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProviderRepository extends JpaRepository<Provider, UUID> {

    Optional<Provider> findByUser(User user);

    boolean existsByUser(User user);

    @Query("""
            SELECT p FROM Provider p
            WHERE (:category IS NULL OR p.category = :category)
              AND (:city IS NULL OR LOWER(p.city) LIKE LOWER(CONCAT('%', :city, '%')))
            """)
    Page<Provider> findWithFilters(
            @Param("category") String category,
            @Param("city") String city,
            Pageable pageable
    );

    @Query("""
            SELECT p FROM Provider p
            WHERE p.available = true
            ORDER BY p.rating DESC, p.totalReviews DESC
            """)
    List<Provider> findFeatured(Pageable pageable);
}
