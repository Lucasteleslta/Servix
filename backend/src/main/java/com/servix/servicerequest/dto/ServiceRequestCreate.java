package com.servix.servicerequest.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

public record ServiceRequestCreate(
        @NotBlank @Size(max = 200) String title,
        @NotBlank String description,
        @NotBlank @Size(max = 50) String category,
        OffsetDateTime scheduledAt,
        @Size(max = 300) String address,
        Double latitude,
        Double longitude,
        @DecimalMin("0.00") BigDecimal budgetMin,
        @DecimalMin("0.00") BigDecimal budgetMax
) {}
