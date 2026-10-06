package com.example.college.gallery.dto;

import java.time.LocalDateTime;

public record ImageResponseDto(
    Long  imageId,
    String imageUrl,
    String caption,
    LocalDateTime uploadedAt
) {

}
