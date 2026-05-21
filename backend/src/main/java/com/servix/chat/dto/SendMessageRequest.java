package com.servix.chat.dto;

import com.servix.domain.enums.MessageType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record SendMessageRequest(
        @NotNull UUID receiverId,
        @NotBlank String content,
        MessageType type
) {}
