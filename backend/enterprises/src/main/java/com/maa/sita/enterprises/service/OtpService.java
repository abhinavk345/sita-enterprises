package com.maa.sita.enterprises.service;

import com.maa.sita.enterprises.dto.SendOtpRequest;
import com.maa.sita.enterprises.dto.VerifyOtpRequest;
import com.maa.sita.enterprises.entity.OtpVerification;
import com.maa.sita.enterprises.entity.User;
import com.maa.sita.enterprises.repository.OtpRepository;
import com.maa.sita.enterprises.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class OtpService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtp(SendOtpRequest request) {

        // 1️⃣ Validate user
        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // 2️⃣ Generate 6 digit OTP
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);

        // 3️⃣ Save OTP
        OtpVerification otpEntity = new OtpVerification();
        otpEntity.setEmail(request.getEmail());
        otpEntity.setOtp(otp);
        otpEntity.setExpiryTime(LocalDateTime.now().plusMinutes(5));
        otpEntity.setVerified(false);

        otpRepository.save(otpEntity);

        // 4️⃣ Send OTP
        if (request.getType().equalsIgnoreCase("email")) {
            sendEmailOtp(request.getEmail(), otp);
        } else {
            sendSmsOtp(user.getContact(), otp);
        }
    }

    public void verifyOtp(VerifyOtpRequest request) {

        OtpVerification otpEntity = otpRepository
                .findTopByEmailOrderByIdDesc(request.getEmail())
                .orElseThrow(() -> new RuntimeException("OTP not found"));

        if (otpEntity.isVerified()) {
            throw new RuntimeException("OTP already used");
        }

        if (otpEntity.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP expired");
        }

        if (!otpEntity.getOtp().equals(request.getOtp())) {
            throw new RuntimeException("Invalid OTP");
        }

        otpEntity.setVerified(true);
        otpRepository.save(otpEntity);
    }

    private void sendEmailOtp(String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Your Login OTP");
        message.setText("Your OTP is: " + otp + "\nValid for 5 minutes.");

        mailSender.send(message);
    }

    private void sendSmsOtp(String mobile, String otp) {
        // Integrate Twilio / Fast2SMS here
        System.out.println("Sending SMS OTP to " + mobile + ": " + otp);
    }
}