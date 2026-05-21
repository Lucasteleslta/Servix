package com.servix.chat.service;

import com.servix.chat.dto.ChatMessageResponse;
import com.servix.chat.dto.ConversationSummary;
import com.servix.chat.dto.SendMessageRequest;
import com.servix.chat.dto.WsIncomingMessage;
import com.servix.domain.entity.ChatMessage;
import com.servix.domain.entity.ServiceRequest;
import com.servix.domain.entity.User;
import com.servix.domain.enums.MessageType;
import com.servix.domain.repository.ChatMessageRepository;
import com.servix.domain.repository.ServiceRequestRepository;
import com.servix.domain.repository.UserRepository;
import com.servix.exception.BusinessException;
import com.servix.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatMessageRepository chatRepo;
    private final ServiceRequestRepository requestRepo;
    private final UserRepository userRepo;

    @Transactional(readOnly = true)
    public Page<ChatMessageResponse> getHistory(UUID requestId, String email, Pageable pageable) {
        User user = findUser(email);
        ServiceRequest sr = findRequest(requestId);
        assertParticipant(sr, user);
        return chatRepo.findByRequestOrderByCreatedAtAsc(sr, pageable).map(ChatMessageResponse::from);
    }

    @Transactional(readOnly = true)
    public List<ConversationSummary> getConversations(String email) {
        User user = findUser(email);
        return chatRepo.findDistinctRequestsByParticipant(user).stream()
                .map(sr -> buildSummary(sr, user))
                .toList();
    }

    @Transactional
    public ChatMessageResponse send(UUID requestId, SendMessageRequest req, String email) {
        User sender = findUser(email);
        ServiceRequest sr = findRequest(requestId);
        assertParticipant(sr, sender);

        User receiver = userRepo.findById(req.receiverId())
                .orElseThrow(() -> new ResourceNotFoundException("User", req.receiverId()));

        ChatMessage msg = ChatMessage.builder()
                .request(sr)
                .sender(sender)
                .receiver(receiver)
                .content(req.content())
                .type(req.type() != null ? req.type() : MessageType.TEXT)
                .build();

        return ChatMessageResponse.from(chatRepo.save(msg));
    }

    @Transactional
    public ChatMessageResponse sendFromWebSocket(UUID requestId, WsIncomingMessage req, String email) {
        User sender = findUser(email);
        ServiceRequest sr = findRequest(requestId);
        assertParticipant(sr, sender);

        User receiver = userRepo.findById(req.receiverId())
                .orElseThrow(() -> new ResourceNotFoundException("User", req.receiverId()));

        ChatMessage msg = ChatMessage.builder()
                .request(sr)
                .sender(sender)
                .receiver(receiver)
                .content(req.content())
                .type(req.type() != null ? req.type() : MessageType.TEXT)
                .build();

        return ChatMessageResponse.from(chatRepo.save(msg));
    }

    @Transactional
    public int markAsRead(UUID requestId, String email) {
        User user = findUser(email);
        ServiceRequest sr = findRequest(requestId);
        return chatRepo.markAllAsRead(sr, user, OffsetDateTime.now());
    }

    private ConversationSummary buildSummary(ServiceRequest sr, User currentUser) {
        Page<ChatMessageResponse> last = chatRepo.findByRequestOrderByCreatedAtAsc(
                sr, Pageable.ofSize(1)
        ).map(ChatMessageResponse::from);

        User other = sr.getClient().getId().equals(currentUser.getId())
                ? sr.getProvider()
                : sr.getClient();

        String lastContent = null;
        OffsetDateTime lastAt = null;
        if (!last.isEmpty()) {
            var msg = last.getContent().get(0);
            lastContent = msg.content();
            lastAt = msg.createdAt();
        }

        long unread = chatRepo.countByRequestAndReceiverAndReadAtIsNull(sr, currentUser);

        return new ConversationSummary(
                sr.getId(),
                sr.getTitle(),
                other != null ? other.getId() : null,
                other != null ? other.getName() : null,
                other != null ? other.getAvatarUrl() : null,
                lastContent,
                unread,
                lastAt
        );
    }

    private void assertParticipant(ServiceRequest sr, User user) {
        boolean isClient = sr.getClient().getId().equals(user.getId());
        boolean isProvider = sr.getProvider() != null && sr.getProvider().getId().equals(user.getId());
        if (!isClient && !isProvider) {
            throw new BusinessException("Not a participant of this request", HttpStatus.FORBIDDEN);
        }
    }

    private ServiceRequest findRequest(UUID id) {
        return requestRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceRequest", id));
    }

    private User findUser(String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", email));
    }
}
