package com.example.college.notice.dto;

import jakarta.validation.constraints.NotBlank;

public record NoticeCreateDto(
    @NotBlank (message = "Notice titile required!")
    String title, 
    @NotBlank (message = "Notice description required!")
    String description,
    @NotBlank (message = "Notice category required!")
    String category
) {

}
