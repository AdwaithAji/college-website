package com.example.college.gallery;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
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
import com.example.college.gallery.dto.ImageResponseDto;
import com.example.college.gallery.dto.ImageUploadDto;

@Service
public class GalleryService {

    GalleryRepository galleryRepository;

    public GalleryService(GalleryRepository galleryRepository) {
        this.galleryRepository = galleryRepository;
    }

    public ApiResponse<Void> addImage(ImageUploadDto info) throws BadRequestException {

        Path uploadPath = Paths.get("uploads", "gallery")
        .toAbsolutePath();

        try {
            Files.createDirectories(uploadPath);
        } catch (IOException err) {
            throw new RuntimeException("Faild find/create upload path!", err);
        }

        if (info.image() != null && !info.image().isEmpty()) {

            String originalName = info.image().getOriginalFilename();
            String extention = "";

            if (originalName != null) {
                int dotIndex = originalName.lastIndexOf(".");
                if (dotIndex > 0) {
                    extention = originalName.substring(dotIndex).toLowerCase();
                }
            }

            if (!List.of(".png", ".jpg", ".webp", ".jpeg").contains(extention)) {
                throw new BadRequestException("Unsupported image format");
            }

            String imageName = UUID.randomUUID().toString() + extention;

            Path imagePath = uploadPath.resolve(imageName);

            try {
 
                info.image().transferTo(imagePath);

                System.out.println("Image saved: " + Files.exists(imagePath));

                Gallery gallery = new Gallery(
                        null,
                        imagePath.toString(),
                        info.image().getContentType(),
                        info.caption(),
                        "PENDING",
                        LocalDateTime.now());

                galleryRepository.save(gallery);

            } catch (IOException error) {
                throw new RuntimeException("Faild to save image!", error);
            }

        } else {
            throw new BadRequestException("Image required");
        }

        return new ApiResponse<Void>("success", "image successfuly updated to gallery", null);
    }

    public ApiResponse<List<ImageResponseDto>> getAllApprovedImage() {

        List<Gallery> gallery = galleryRepository.findByStatus("APPROVED");
        List<ImageResponseDto> images = new ArrayList<>();

        for (Gallery image : gallery) {

            images.add(
                new ImageResponseDto(
                    image.getId(),
                    "/gallery/image/"+image.getId(),
                    image.getCaption(),
                    image.getUploadedAt()
                )
            );
 
        }

        return new ApiResponse<List<ImageResponseDto>>("success", "successfully returned accepted images", images);

    }

    public ApiResponse<List<ImageResponseDto>> getAllPendingImage() {

        List<Gallery> gallery = galleryRepository.findByStatus("PENDING");
        List<ImageResponseDto> images = new ArrayList<>();

        for (Gallery image : gallery) {

            images.add(
                new ImageResponseDto(
                    image.getId(),
                    "/gallery/image/"+image.getId(),
                    image.getCaption(),
                    image.getUploadedAt()
                )
            );
        }

        return new ApiResponse<List<ImageResponseDto>>("success", "successfully returned pending images", images);

    }

    public ImageDataDto getImageById(Long id) {

        Gallery image = galleryRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Image not found!"));

        Path imagePath = Paths.get(image.getPath());

        try {
            Resource resource = new UrlResource(imagePath.toUri());

            if(resource.exists() && resource.isReadable()) {
                return new ImageDataDto(resource, image.getImageType());
            }

            throw new ResourceNotFoundException("Image not found!");

        } catch (IOException error) {
            throw new ResourceNotFoundException("Image not found!");
        }
    }

    ApiResponse<Void> approveImageById(Long id) {

        Gallery image = galleryRepository.findById(id)
                            .orElseThrow(() -> new ResourceNotFoundException("Image not found"));

        image.setStatus("APPROVED");

        galleryRepository.save(image);

        return new ApiResponse<Void>("Success", "Image Accepted successfully", null);

    }

    ApiResponse<Void> rejectImageById(Long id) {
 
        Gallery image = galleryRepository.findById(id)
                            .orElseThrow(() -> new ResourceNotFoundException("Image not found"));

        image.setStatus("REJECTED");

        galleryRepository.save(image);

        return new ApiResponse<Void>("Success", "Image rejected successfully", null);

    }
}
