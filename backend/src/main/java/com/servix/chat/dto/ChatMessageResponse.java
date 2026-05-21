package com.servix.chat.dto;

import com.servix.domain.entity.ChatMessage;
import com.servix.domain.enums.MessageType;

import java.time.OffsetDateTime;
import java.util.UUID;

public record ChatMessageResponse(
        UUID id,
        UUID requestId,
        UUID senderId,
        String senderName,
        String senderAvatarUrl,
        UUID receiverId,
        String content,
        MessageType type,
        OffsetDateTime readAt,
        OffsetDateTime createdAt
) {
    public static ChatMessageResponse from(ChatMessage m) {
        return new ChatMessageResponse(
                m.getId(),
                m.getRequest().getId(),
                m.getSender().getId(),
                m.getSender().getName(),
                m.getSender().getAvatarUrl(),
                m.getReceiver().getId(),
                m.getContent(),
                m.getType(),
                m.getReadAt(),
                m.getCreatedAt()
        );
    }
}
