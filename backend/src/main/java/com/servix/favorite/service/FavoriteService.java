package com.servix.favorite.service;

import com.servix.domain.entity.Favorite;
import com.servix.domain.entity.Provider;
import com.servix.domain.entity.User;
import com.servix.domain.repository.FavoriteRepository;
import com.servix.domain.repository.ProviderRepository;
import com.servix.domain.repository.UserRepository;
import com.servix.exception.BusinessException;
import com.servix.exception.ResourceNotFoundException;
import com.servix.favorite.dto.FavoriteResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final ProviderRepository providerRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<FavoriteResponse> listMyFavorites(String email, Pageable pageable) {
        User client = findUser(email);
        return favoriteRepository.findByClient(client, pageable).map(FavoriteResponse::from);
    }

    @Transactional
    public FavoriteResponse add(UUID providerId, String email) {
        User client = findUser(email);
        Provider provider = providerRepository.findById(providerId)
                .orElseThrow(() -> new ResourceNotFoundException("Provider", providerId));

        if (favoriteRepository.existsByClientAndProvider(client, provider)) {
            throw new BusinessException("Provider is already in your favorites", HttpStatus.CONFLICT);
        }

        Favorite favorite = Favorite.builder()
                .client(client)
                .provider(provider)
                .build();

        return FavoriteResponse.from(favoriteRepository.save(favorite));
    }

    @Transactional
    public void remove(UUID providerId, String email) {
        User client = findUser(email);
        Provider provider = providerRepository.findById(providerId)
                .orElseThrow(() -> new ResourceNotFoundException("Provider", providerId));

        Favorite favorite = favoriteRepository.findByClientAndProvider(client, provider)
                .orElseThrow(() -> new ResourceNotFoundException("Favorite", providerId));

        favoriteRepository.delete(favorite);
    }

    private User findUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", email));
    }
}
