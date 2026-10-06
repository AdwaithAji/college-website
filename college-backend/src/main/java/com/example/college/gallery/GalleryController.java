package com.example.college.gallery;

import java.util.List;

import org.apache.coyote.BadRequestException;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.college.common.ApiResponse;
import com.example.college.common.ImageDataDto;
import com.example.college.gallery.dto.ImageResponseDto;
import com.example.college.gallery.dto.ImageUploadDto;

@RestController 
@RequestMapping ("/gallery")
public class GalleryController {

    GalleryService service;

    public GalleryController(GalleryService service){
        this.service = service;
    }

    @PostMapping ("/upload")
    public ResponseEntity<ApiResponse<Void>> addImage(@ModelAttribute ImageUploadDto info) throws BadRequestException {

        System.out.println("Controler reached");
        return ResponseEntity.ok(service.addImage(info));

    }

    @GetMapping ("/approved") 
    public ResponseEntity<ApiResponse<List<ImageResponseDto>>> getAllApprovedImage() {

        return ResponseEntity.ok(service.getAllApprovedImage());

    }

    @GetMapping ("/pending")
    public ResponseEntity<ApiResponse<List<ImageResponseDto>>> getAllPendingImage() {

        return ResponseEntity.ok(service.getAllPendingImage());

    }

    @PostMapping ("/approve/{id}")
    public ResponseEntity<ApiResponse<Void>> approveImageById(@PathVariable Long id) {

        return ResponseEntity.ok(service.approveImageById(id));

    }

    @PostMapping ("/reject/{id}")
    public ResponseEntity<ApiResponse<Void>> rejectImageById(@PathVariable Long id) {

        return ResponseEntity.ok(service.rejectImageById(id));

    }

    @GetMapping ("/image/{id}")
    public ResponseEntity<Resource> getImageById(@PathVariable Long id) {

        ImageDataDto image = service.getImageById(id);

        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(image.imageType()))
            .body(image.resource());
    }

}
