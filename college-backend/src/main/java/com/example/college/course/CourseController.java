package com.example.college.course;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.college.common.ApiResponse;
import com.example.college.course.dto.CourseCreateDto;
import com.example.college.course.dto.CourseResponseDto;

import jakarta.validation.Valid;

@RestController 
@RequestMapping ("/course")
public class CourseController {

    private CourseService service;

    public CourseController(CourseService service) {
        this.service = service;
    }

    @GetMapping 
    public ResponseEntity<List<CourseResponseDto>> getAllCourse() {

        return ResponseEntity.ok(service.getAllCourse());

    }

    @PostMapping 
    public ResponseEntity<ApiResponse<CourseResponseDto>> addCourse(@Valid @RequestBody CourseCreateDto info) {

        return ResponseEntity.ok(service.addCourse(info));

    }

    @DeleteMapping ("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCource(@PathVariable Long id) {

        return ResponseEntity.ok(service.deleteCourseById(id));

    }


}
