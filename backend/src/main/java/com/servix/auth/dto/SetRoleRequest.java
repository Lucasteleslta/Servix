package com.servix.auth.dto;

import com.servix.domain.enums.UserRole;
import jakarta.validation.constraints.NotNull;

public record SetRoleRequest(@NotNull UserRole role) {}
