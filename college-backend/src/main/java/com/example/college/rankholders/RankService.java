package com.example.college.rankholders;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.apache.coyote.BadRequestException;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import com.example.college.common.ApiResponse;
import com.example.college.common.ImageDataDto;
import com.example.college.exception.ResourceNotFoundException;
import com.example.college.rankholders.dto.RankHolderCreateDto;
import com.example.college.rankholders.dto.RankHolderResponseDto;

@Service 
public class RankService {

    private RankRepository rankRepository;

    public RankService(RankRepository rankRepository) {
        this.rankRepository = rankRepository;
    }

    public ApiResponse<RankHolderResponseDto> addRankHolder(RankHolderCreateDto info) throws BadRequestException {

        Path uploadPath = Paths.get("uploads", "rankholders")
                .toAbsolutePath();

        if (info.image() == null || info.image().isEmpty()) {

            throw new BadRequestException("Image not found!");

        }

        try {
            Files.createDirectories(uploadPath);
        } catch (IOException error) {
            throw new RuntimeException("failed to find/create upload path" + error);
        }

        String imageName = UUID.randomUUID() + "";
        String extention = "";

        String imageFullName = info.image().getOriginalFilename();
        extention = imageFullName.substring(imageFullName.lastIndexOf(".")).toLowerCase();

        if (!List.of(".jpg", ".png", ".jpeg", ".webp").contains(extention)) {
            throw new BadRequestException("Unsupported image format");
        }

        uploadPath = uploadPath.resolve(imageName + extention);

        try {

            info.image().transferTo(uploadPath);

            RankHolders newRankHolder = new RankHolders(null,
                    info.name(),
                    info.rank(),
                    info.year(),
                    info.department(),
                    info.image().getContentType(),
                    imageName + extention);

            newRankHolder = rankRepository.save(newRankHolder);

            RankHolderResponseDto response = new RankHolderResponseDto(
                newRankHolder.getId(), 
                newRankHolder.getName(),
                newRankHolder.getDepartment(), 
                newRankHolder.getYear(),
                newRankHolder.getRank(), 
                "/rank/image/"+newRankHolder.getId()
            );

            return new ApiResponse<RankHolderResponseDto>("Success", "Rank holder created successfully", response);

        } catch (IOException error) {
            throw new RuntimeException("Error saving the image: " + error);
        }

    }


    public ApiResponse<List<RankHolderResponseDto>> getRankHolders() {
        
        List<RankHolders> rankHolders = rankRepository.findAll();

        List<RankHolderResponseDto> data = new ArrayList<>();

        for(RankHolders rankHolder : rankHolders) {
            data.add(new RankHolderResponseDto(
                rankHolder.getId(), 
                rankHolder.getName(),
                rankHolder.getDepartment(), 
                rankHolder.getYear(),
                rankHolder.getRank(), 
                "/rank/image/"+rankHolder.getId()));
        }

        return new ApiResponse<List<RankHolderResponseDto>>("Success", "Successfully returned all rank holders", data);
    }

    public ApiResponse<Void> deleteRankHolderById(Long id) {
        RankHolders rankHolder = rankRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rank holder not found with id " + id));

        Path uploadPath = Paths.get("uploads", "rankholders")
                .toAbsolutePath();

        Path imagePath = uploadPath.resolve(rankHolder.getImagePath());

        try {
            Files.deleteIfExists(imagePath);
            rankRepository.delete(rankHolder);
        } catch (IOException error) {
            throw new RuntimeException("Error deleting rank holder image: "+error);
        }

        return new ApiResponse<Void>("Success", "Successfully deleted rank holder", null);
    }
    
    public ImageDataDto getRankHolderImageById(Long id) {

        RankHolders rankHolder = rankRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rank holder not found with the id " + id));


        Path uploadPath = Paths.get("uploads", "rankholders")
                               .toAbsolutePath();

        try {

            uploadPath =  uploadPath.resolve(rankHolder.getImagePath());
            Resource resource = new UrlResource(uploadPath.toUri());

            if (resource.exists() && resource.isReadable()) {

                ImageDataDto response = new ImageDataDto(
                        resource,
                        rankHolder.getImageType());

                return response;

            } else {
                throw new ResourceNotFoundException("Image not found");
            }

        } catch (IOException error) {
            throw new RuntimeException("Error retrieving image: " + error);
        }

    }

}
