package com.maa.sita.enterprises.controller;

import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import com.maa.sita.enterprises.service.UserService;
import com.maa.sita.enterprises.entity.User;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // GET PROFILE
    @GetMapping("/profile")
    public User getProfile(@RequestParam String email) {
        return userService.getProfile(email);
    }

    // UPDATE PROFILE
    @PutMapping("/profile")
    public User updateProfile(
            @RequestParam String email,
            @RequestBody User user) {
        return userService.updateProfile(email, user);
    }
}