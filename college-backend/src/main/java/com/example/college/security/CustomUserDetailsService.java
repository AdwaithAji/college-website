package com.example.college.security;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.college.admin.Admin;
import com.example.college.admin.AdminRepository;

@Service 
public class CustomUserDetailsService implements UserDetailsService {

    private  AdminRepository adminRepository;

    public CustomUserDetailsService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Admin admin = adminRepository.findByUsername(username)
                      .orElseThrow(() -> new  UsernameNotFoundException("User not found"));
   
        return new CustomUserDetails(
            admin.getUserId(),
            admin.getUsername(),
            admin.getPassword(),
            List.of(new SimpleGrantedAuthority("ROLE_ADMIN")));
    }

}
