package com.servix.servicerequest.dto;

import com.servix.domain.enums.RequestStatus;
import jakarta.validation.constraints.NotNull;

public record UpdateStatusRequest(@NotNull RequestStatus status) {}
