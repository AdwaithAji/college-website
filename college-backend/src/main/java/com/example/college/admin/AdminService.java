package com.example.college.admin;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.college.admin.dto.AdminDetailsDto;
import com.example.college.admin.dto.AdminLoginResponseDto;
import com.example.college.common.ApiResponse;
import com.example.college.security.CustomUserDetails;
import com.example.college.security.JwtService;

@Service 
public class AdminService {

    private AuthenticationManager authenticationManager;
    private PasswordEncoder passwordEncoder;

    final AdminRepository adminRepository;
    private JwtService jwtService;

    public AdminService(AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, AdminRepository adminRepository, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.adminRepository = adminRepository;
        this.jwtService = jwtService;
    }

    public ApiResponse<Void> registerAdmin(AdminDetailsDto info) {

        Admin newAdmin = new Admin(null, info.username(), passwordEncoder.encode(info.password()));
        adminRepository.save(newAdmin);

        return new ApiResponse<Void>("success","admin registered successfully", null);
    }

    public ApiResponse<AdminLoginResponseDto> loginAdmin(AdminDetailsDto info) {

        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                info.username(), 
                info.password()
            )
        );
        System.out.println("Before");
        CustomUserDetails userDetails = (CustomUserDetails)authentication.getPrincipal();
        System.out.println("after");

        String jwtToken = jwtService.generateToken(userDetails);

        AdminLoginResponseDto response = new AdminLoginResponseDto(jwtToken, "Bearer");

        return new ApiResponse<AdminLoginResponseDto>("success","Successfully Logined", response);
    }


}
