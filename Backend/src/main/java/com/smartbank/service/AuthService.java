package com.smartbank.service;

import com.smartbank.entity.Account;
import com.smartbank.entity.User;
import com.smartbank.repository.AccountRepository;
import com.smartbank.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    
    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        Account newAccount = new Account();
        newAccount.setAccountNumber("SB" + System.currentTimeMillis());
        newAccount.setBalance(new BigDecimal("1000.00"));
        
        // Bidirectional Link: Dono taraf se connect karna zaroori hai
        newAccount.setUser(user); 
        user.setAccount(newAccount); 

        return userRepository.save(user); // CascadeType.ALL account ko bhi save kar dega
    }
    
    public String loginUser(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Plain password (from React) ko Encrypted password (from DB) se match karein
            if (passwordEncoder.matches(password, user.getPassword())) {
                return "Login Successful"; 
            }
        }
        return "Error: Invalid credentials";
    }
}