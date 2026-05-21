package com.servix.chat.dto;

import com.servix.domain.enums.MessageType;

import java.util.UUID;

public record WsIncomingMessage(
        UUID receiverId,
        String content,
        MessageType type
) {}
