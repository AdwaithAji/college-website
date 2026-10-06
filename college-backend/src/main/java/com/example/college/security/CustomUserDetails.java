package com.example.college.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor 
@NoArgsConstructor 
@Getter 
@Setter 

public class CustomUserDetails implements UserDetails{

    private Long userId;
    private String username;
    private String password;

    private Collection<? extends GrantedAuthority> authorities;

}
