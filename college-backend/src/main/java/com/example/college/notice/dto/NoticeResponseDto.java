package com.example.college.notice.dto;

import java.time.LocalDateTime;

public record NoticeResponseDto(
    Long id,
    String title, 
    String description,
    String category,
    LocalDateTime publishedAt
) {

}
