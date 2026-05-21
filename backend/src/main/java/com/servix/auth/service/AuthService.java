package com.servix.auth.service;

import com.servix.auth.dto.AuthResponse;
import com.servix.auth.dto.AuthResponse.UserResponse;
import com.servix.auth.dto.LoginRequest;
import com.servix.auth.dto.RefreshTokenRequest;
import com.servix.auth.dto.RegisterRequest;
import com.servix.auth.dto.SetRoleRequest;
import com.servix.domain.entity.Provider;
import com.servix.domain.entity.RefreshToken;
import com.servix.domain.entity.User;
import com.servix.domain.enums.UserRole;
import com.servix.domain.repository.ProviderRepository;
import com.servix.domain.repository.RefreshTokenRepository;
import com.servix.domain.repository.UserRepository;
import com.servix.exception.EmailAlreadyExistsException;
import com.servix.exception.InvalidTokenException;
import com.servix.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final ProviderRepository providerRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Value("${jwt.refresh-expiration:604800000}")
    private long refreshExpiration;

    @Transactional
    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.email())) {
            throw new EmailAlreadyExistsException(req.email());
        }

        User user = User.builder()
                .name(req.name())
                .email(req.email())
                .phone(req.phone())
                .passwordHash(passwordEncoder.encode(req.password()))
                .role(UserRole.CLIENT)
                .build();

        userRepository.save(user);
        return buildAuthResponse(user);
    }

    @Transactional
    public AuthResponse login(LoginRequest req) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.email(), req.password()));

        User user = userRepository.findByEmail(req.email()).orElseThrow();
        return buildAuthResponse(user);
    }

    @Transactional
    public AuthResponse setRole(SetRoleRequest req, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        user.setRole(req.role());

        if (req.role() == UserRole.PROVIDER && !providerRepository.existsByUser(user)) {
            providerRepository.save(Provider.builder().user(user).category("Geral").build());
        }

        userRepository.save(user);
        return buildAuthResponse(user);
    }

    @Transactional
    public AuthResponse refresh(RefreshTokenRequest req) {
        RefreshToken stored = refreshTokenRepository.findByToken(req.refreshToken())
                .orElseThrow(InvalidTokenException::new);

        if (stored.isExpired()) {
            refreshTokenRepository.delete(stored);
            throw new InvalidTokenException();
        }

        User user = stored.getUser();
        String accessToken = jwtService.generateToken(user);
        return new AuthResponse(UserResponse.from(user), accessToken, stored.getToken());
    }

    @Transactional
    public void logout(String email) {
        userRepository.findByEmail(email)
                .ifPresent(refreshTokenRepository::deleteByUser);
    }

    private AuthResponse buildAuthResponse(User user) {
        String accessToken = jwtService.generateToken(user);
        String refreshTokenValue = UUID.randomUUID().toString();

        refreshTokenRepository.deleteByUser(user);
        refreshTokenRepository.save(RefreshToken.builder()
                .user(user)
                .token(refreshTokenValue)
                .expiresAt(OffsetDateTime.now().plusSeconds(refreshExpiration / 1000))
                .build());

        return new AuthResponse(UserResponse.from(user), accessToken, refreshTokenValue);
    }
}
