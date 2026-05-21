package com.servix.review.dto;

import jakarta.validation.constraints.*;

import java.util.UUID;

public record ReviewCreate(
        @NotNull UUID requestId,
        @NotNull @Min(1) @Max(5) Short rating,
        @Size(max = 2000) String comment
) {}
