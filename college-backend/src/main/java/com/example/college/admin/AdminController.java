package com.example.college.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.college.admin.dto.AdminDetailsDto;
import com.example.college.admin.dto.AdminLoginResponseDto;
import com.example.college.common.ApiResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private AdminService service;

    public AdminController(AdminService service) {
        this.service = service;
    }

    @PostMapping("/reg")
    public ResponseEntity<ApiResponse<Void>> registerAdmin(@Valid @RequestBody AdminDetailsDto info) {

        return ResponseEntity.ok(service.registerAdmin(info));

    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AdminLoginResponseDto>> loginAdmin(@Valid @RequestBody AdminDetailsDto info) {

        return ResponseEntity.ok(service.loginAdmin(info));

    }

}
