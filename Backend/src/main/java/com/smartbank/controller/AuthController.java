package com.smartbank.controller;

import com.smartbank.entity.User;
import com.smartbank.service.AuthService;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        try {
            // 'result' ko User type mein pakdein, String mein nahi
            User registeredUser = authService.registerUser(user); 
            return ResponseEntity.ok(registeredUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        String result = authService.loginUser(user.getUsername(), user.getPassword());
        
        if (result.contains("Error")) {
            return ResponseEntity.status(401).body(Map.of("message", result));
        }
        
        // Industrial standard: Login success par user details bhejna
        return ResponseEntity.ok(Map.of(
            "message", "Success",
            "username", user.getUsername(),
            "role", "ROLE_CUSTOMER" // Filhal hardcoded, baad mein DB se lenge
        ));
    }
}