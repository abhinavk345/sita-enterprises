package com.maa.sita.enterprises.controller;

import com.maa.sita.enterprises.dto.SendOtpRequest;
import com.maa.sita.enterprises.dto.VerifyOtpRequest;
import com.maa.sita.enterprises.entity.User;
import com.maa.sita.enterprises.service.OtpService;
import com.maa.sita.enterprises.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserService userService;
    private final OtpService otpService;
    public AuthController(UserService userService,OtpService otpService) {
        this.userService = userService;
        this.otpService = otpService;
    }

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody SendOtpRequest request) {
        otpService.sendOtp(request);
        return ResponseEntity.ok("OTP sent successfully");
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody VerifyOtpRequest request) {
        otpService.verifyOtp(request);
        return ResponseEntity.ok("OTP verified successfully");
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestParam String email,
                        @RequestParam String password) {
        return userService.login(email, password);
    }
}