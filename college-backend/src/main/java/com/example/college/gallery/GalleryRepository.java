package com.example.college.gallery;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository 
public interface GalleryRepository extends JpaRepository<Gallery, Long> {

    List<Gallery> findByStatus(String status);

}
