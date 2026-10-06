package com.example.college.admin.dto;

import jakarta.validation.constraints.NotBlank;

public record AdminDetailsDto(
    @NotBlank (message = "username is required")
    String username,
    @NotBlank (message = "password is required")
    String password
) {

}
