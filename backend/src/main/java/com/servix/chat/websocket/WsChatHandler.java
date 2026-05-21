package com.servix.chat.websocket;

import com.servix.chat.dto.ChatMessageResponse;
import com.servix.chat.dto.WsIncomingMessage;
import com.servix.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
public class WsChatHandler {

    private final ChatService chatService;
    private final SimpMessagingTemplate broker;

    /**
     * Client publishes to: /app/chat/{requestId}
     * Server broadcasts to: /topic/chat/{requestId}
     * Server also notifies receiver privately: /user/{receiverId}/queue/chat
     */
    @MessageMapping("/chat/{requestId}")
    public void handleMessage(
            @DestinationVariable UUID requestId,
            @Payload WsIncomingMessage incoming,
            Principal principal
    ) {
        ChatMessageResponse saved = chatService.sendFromWebSocket(requestId, incoming, principal.getName());

        // broadcast to all subscribers of the request room
        broker.convertAndSend("/topic/chat/" + requestId, saved);

        // also push to the receiver's private queue (for unread badge updates)
        broker.convertAndSendToUser(
                saved.receiverId().toString(),
                "/queue/chat",
                saved
        );
    }
}
