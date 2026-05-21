package com.servix.chat.dto;

import java.time.OffsetDateTime;
import java.util.UUID;

public record ConversationSummary(
        UUID requestId,
        String requestTitle,
        UUID otherUserId,
        String otherUserName,
        String otherUserAvatarUrl,
        String lastMessage,
        long unreadCount,
        OffsetDateTime lastMessageAt
) {}
