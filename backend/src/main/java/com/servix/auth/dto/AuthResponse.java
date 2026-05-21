package com.servix.auth.dto;

import com.servix.domain.entity.User;

import java.time.OffsetDateTime;

public record AuthResponse(UserResponse user, String token, String refreshToken) {

    public record UserResponse(
            String id,
            String name,
            String email,
            String phone,
            String role,
            String avatarUrl,
            OffsetDateTime createdAt
    ) {
        public static UserResponse from(User user) {
            return new UserResponse(
                    user.getId().toString(),
                    user.getName(),
                    user.getEmail(),
                    user.getPhone(),
                    user.getRole().name(),
                    user.getAvatarUrl(),
                    user.getCreatedAt()
            );
        }
    }
}
