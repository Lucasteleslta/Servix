package com.servix.domain.repository;

import com.servix.domain.entity.ChatMessage;
import com.servix.domain.entity.ServiceRequest;
import com.servix.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, UUID> {

    Page<ChatMessage> findByRequestOrderByCreatedAtAsc(ServiceRequest request, Pageable pageable);

    @Query("""
            SELECT DISTINCT cm.request FROM ChatMessage cm
            WHERE cm.sender = :user OR cm.receiver = :user
            ORDER BY cm.request.createdAt DESC
            """)
    List<ServiceRequest> findDistinctRequestsByParticipant(@Param("user") User user);

    @Modifying
    @Query("""
            UPDATE ChatMessage cm SET cm.readAt = :now
            WHERE cm.request = :request AND cm.receiver = :receiver AND cm.readAt IS NULL
            """)
    int markAllAsRead(
            @Param("request") ServiceRequest request,
            @Param("receiver") User receiver,
            @Param("now") OffsetDateTime now
    );

    long countByRequestAndReceiverAndReadAtIsNull(ServiceRequest request, User receiver);
}
