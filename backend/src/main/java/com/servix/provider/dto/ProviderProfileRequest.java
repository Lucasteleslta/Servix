package com.servix.provider.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record ProviderProfileRequest(
        @NotBlank @Size(max = 50) String category,
        @Size(max = 2000) String description,
        @DecimalMin("0.00") BigDecimal hourlyRate,
        Double latitude,
        Double longitude
) {}
