package com.example.college.rankholders.dto;

import org.springframework.web.multipart.MultipartFile;

public record RankHolderCreateDto(
    String name,
    String rank,
    Integer year,
    String department,
    MultipartFile  image
) {

}
