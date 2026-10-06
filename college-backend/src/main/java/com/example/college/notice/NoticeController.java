package com.example.college.notice;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import com.example.college.common.ApiResponse;
import com.example.college.notice.dto.NoticeCreateDto;
import com.example.college.notice.dto.NoticeResponseDto;

@RestController 
@RequestMapping("/notice")
public class NoticeController {

    private NoticeService service;

    NoticeController(NoticeService service) {
        this.service = service;
    }

    @GetMapping()
    ResponseEntity<List<NoticeResponseDto>> getAllNotice() {

        return ResponseEntity.ok(service.getAllNotice());
    }
    
    @PostMapping()
    ResponseEntity<ApiResponse<NoticeResponseDto>> addNotice(@Valid @RequestBody NoticeCreateDto info) {

        return ResponseEntity.ok(service.addNotice(info));

    }

    @DeleteMapping("/{id}")
    ResponseEntity<ApiResponse<Void>> deleteNoticeById(@PathVariable Long id) {

        return ResponseEntity.ok(service.deleteNoticeById(id));
    }


}
