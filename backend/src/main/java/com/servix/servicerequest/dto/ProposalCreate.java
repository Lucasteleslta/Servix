package com.servix.servicerequest.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record ProposalCreate(
        @NotNull @DecimalMin("0.01") BigDecimal price,
        @Size(max = 100) String estimatedDuration,
        @Size(max = 2000) String message
) {}
