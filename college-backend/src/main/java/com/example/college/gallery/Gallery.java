package com.example.college.gallery;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor 
@NoArgsConstructor 
@Getter 
@Setter 

@Entity 
@Table (name = "gallery")
public class Gallery {

    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (name = "path")
    private String Path;

    @Column (name = "imageType")
    private String imageType;

    @Column (name = "caption", columnDefinition = "TEXT")
    private String caption;

    @Column (name = "status")
    private String status;

    @Column (name = "uploadedAt")
    private LocalDateTime uploadedAt;

}
