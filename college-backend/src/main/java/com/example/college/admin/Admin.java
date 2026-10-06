package com.example.college.admin;

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
@Table (name = "admin_db")
public class Admin {

    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column (name = "username")
    private String username;

    @Column (name = "password")
    private String password;
}
