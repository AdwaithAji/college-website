package com.example.college.course;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.college.common.ApiResponse;
import com.example.college.course.dto.CourseCreateDto;
import com.example.college.course.dto.CourseResponseDto;
import com.example.college.exception.ResourceNotFoundException;

@Service
public class CourseService {

    final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<CourseResponseDto> getAllCourse() {

        List<Course> courses = courseRepository.findAll();
        List<CourseResponseDto> data = new ArrayList<>();

        for (Course course : courses) {
            data.add(new CourseResponseDto(
                    course.getId(),
                    course.getName(),
                    course.getDescription(),
                    course.getDuration(),
                    course.getProgrammeType()));
        }

        return data;

    }

    public ApiResponse<CourseResponseDto> addCourse(CourseCreateDto info) {

        Course newCourse = new Course(null, info.name(), info.description(), info.duration(), info.programmeType());

        newCourse = courseRepository.save(newCourse);
        CourseResponseDto response = new CourseResponseDto(
                newCourse.getId(),
                newCourse.getName(),
                newCourse.getDescription(),
                newCourse.getDuration(),
                newCourse.getProgrammeType());

        return new ApiResponse<CourseResponseDto>("success", "Course created successfully", response);

    }

    public ApiResponse<Void> deleteCourseById(Long id) {
        Course notice = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notice not found"));

        courseRepository.delete(notice);

        return new ApiResponse<Void>("Success", "Deleted notice successfully", null);
    }

}
