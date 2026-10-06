package com.example.college.rankholders.dto;

public record RankHolderResponseDto(
    Long userId,
    String name,
    String department,
    Integer year,
    String rank,
    String imageUrl
) {

}
