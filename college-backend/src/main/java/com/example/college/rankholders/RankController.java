package com.example.college.rankholders;

import java.util.List;

import org.apache.coyote.BadRequestException;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.college.common.ApiResponse;
import com.example.college.common.ImageDataDto;
import com.example.college.rankholders.dto.RankHolderCreateDto;
import com.example.college.rankholders.dto.RankHolderResponseDto;

@RestController
@RequestMapping("/rank")
public class RankController {

    private RankService service;

    public RankController(RankService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<RankHolderResponseDto>> addRankHolder(@ModelAttribute RankHolderCreateDto info) throws BadRequestException {

        return ResponseEntity.ok(service.addRankHolder(info));

    }

    @GetMapping 
    public ResponseEntity<ApiResponse<List<RankHolderResponseDto>>> getRankHolders() {

        return ResponseEntity.ok(service.getRankHolders());

    }

    @DeleteMapping ("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteRankHolderById(@PathVariable Long id) {

        return ResponseEntity.ok(service.deleteRankHolderById(id));

    }

    @GetMapping ("/image/{id}")
    public ResponseEntity<Resource> getRankHolderImageById(@PathVariable Long id) {

        ImageDataDto image = service.getRankHolderImageById(id);

        return ResponseEntity.ok()
                             .contentType(MediaType.parseMediaType(image.imageType()))
                             .body(image.resource());

    }
}
