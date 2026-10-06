package com.example.college.course.dto;

public record CourseResponseDto(
    Long id,
    String name,
    String description,
    String duration,
    String programmeType
) {

}
