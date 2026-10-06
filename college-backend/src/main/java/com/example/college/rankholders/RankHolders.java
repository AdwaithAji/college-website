package com.example.college.rankholders;

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
@Table (name = "rankholders")
public class RankHolders {

    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (name = "name")
    private String name;

    @Column (name = "rank")
    private String rank;

    @Column (name = "year")
    private Integer year;

    @Column (name = "department")
    private String department;

    @Column (name = "imageType")
    private String imageType;

    @Column (name = "imagePath")
    private String imagePath;
}
