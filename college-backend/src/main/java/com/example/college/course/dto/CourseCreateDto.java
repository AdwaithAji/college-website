package com.example.college.course.dto;

import jakarta.validation.constraints.NotBlank;

public record CourseCreateDto(
    @NotBlank (message = "course name required!")    
    String name,
    @NotBlank (message = "course description required!")    
    String description,
    @NotBlank (message = "course description required!")    
    String duration,
    @NotBlank (message = "course description required!")    
    String programmeType
) {

}
