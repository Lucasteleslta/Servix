package com.servix.provider.service;

import com.servix.domain.entity.Provider;
import com.servix.domain.entity.User;
import com.servix.domain.repository.ProviderRepository;
import com.servix.domain.repository.UserRepository;
import com.servix.exception.BusinessException;
import com.servix.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import com.servix.provider.dto.ProviderProfileRequest;
import com.servix.provider.dto.ProviderResponse;
import com.servix.provider.dto.UpdateAvailabilityRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProviderService {

    private final ProviderRepository providerRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<ProviderResponse> listAll(Pageable pageable) {
        return providerRepository.findAll(pageable).map(ProviderResponse::from);
    }

    @Transactional(readOnly = true)
    public ProviderResponse getById(UUID id) {
        return providerRepository.findById(id)
                .map(ProviderResponse::from)
                .orElseThrow(() -> new ResourceNotFoundException("Provider", "not found"));
    }

    @Transactional(readOnly = true)
    public ProviderResponse getByCurrentUser(String email) {
        User user = findUserByEmail(email);
        Provider provider = providerRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Provider profile", "not found"));
        return ProviderResponse.from(provider);
    }

    @Transactional
    public ProviderResponse createOrUpdate(ProviderProfileRequest req, String email) {
        User user = findUserByEmail(email);

        Provider provider = providerRepository.findByUser(user).orElseGet(() -> Provider.builder().user(user).build());

        provider.setCategory(req.category());
        provider.setDescription(req.description());
        provider.setHourlyRate(req.hourlyRate());
        provider.setLatitude(req.latitude());
        provider.setLongitude(req.longitude());

        return ProviderResponse.from(providerRepository.save(provider));
    }

    @Transactional
    public ProviderResponse updateAvailability(UpdateAvailabilityRequest req, String email) {
        User user = findUserByEmail(email);
        Provider provider = providerRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Provider profile", "not found"));
        provider.setAvailable(req.available());
        return ProviderResponse.from(providerRepository.save(provider));
    }

    @Transactional
    public void delete(String email) {
        User user = findUserByEmail(email);
        Provider provider = providerRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Provider profile", "not found"));
        providerRepository.delete(provider);
    }

    private User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "not found"));
    }
}
