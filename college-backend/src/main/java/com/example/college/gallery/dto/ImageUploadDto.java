package com.example.college.gallery.dto;

import org.springframework.web.multipart.MultipartFile;

public record ImageUploadDto(
    MultipartFile image,
    String caption
) {

}
