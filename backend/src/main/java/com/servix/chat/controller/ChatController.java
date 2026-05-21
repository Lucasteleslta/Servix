package com.servix.chat.controller;

import com.servix.chat.dto.ChatMessageResponse;
import com.servix.chat.dto.ConversationSummary;
import com.servix.chat.dto.SendMessageRequest;
import com.servix.chat.service.ChatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Chat", description = "Mensagens entre cliente e provider")
public class ChatController {

    private final ChatService chatService;

    @GetMapping("/conversations")
    @Operation(summary = "Listar conversas do usuário logado com última mensagem e unread count")
    public List<ConversationSummary> conversations(@AuthenticationPrincipal UserDetails principal) {
        return chatService.getConversations(principal.getUsername());
    }

    @GetMapping("/requests/{requestId}/messages")
    @Operation(summary = "Histórico de mensagens de um pedido (somente participantes)")
    public Page<ChatMessageResponse> history(
            @PathVariable UUID requestId,
            @AuthenticationPrincipal UserDetails principal,
            @PageableDefault(size = 50) Pageable pageable
    ) {
        return chatService.getHistory(requestId, principal.getUsername(), pageable);
    }

    @PostMapping("/requests/{requestId}/messages")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Enviar mensagem via HTTP (alternativa ao WebSocket)")
    public ChatMessageResponse send(
            @PathVariable UUID requestId,
            @Valid @RequestBody SendMessageRequest req,
            @AuthenticationPrincipal UserDetails principal
    ) {
        return chatService.send(requestId, req, principal.getUsername());
    }

    @PatchMapping("/requests/{requestId}/read")
    @Operation(summary = "Marcar todas as mensagens recebidas como lidas")
    public void markAsRead(
            @PathVariable UUID requestId,
            @AuthenticationPrincipal UserDetails principal
    ) {
        chatService.markAsRead(requestId, principal.getUsername());
    }
}
