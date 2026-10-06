package com.example.college.common;

public record ApiResponse<T>(
    String status,
    String message,
    T data
) {

}
