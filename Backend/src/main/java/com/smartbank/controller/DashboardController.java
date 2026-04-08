package com.smartbank.controller;

import com.smartbank.entity.User;
import com.smartbank.entity.Transaction;
import com.smartbank.repository.UserRepository;
import com.smartbank.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import java.security.Principal;
import java.util.List;

@Controller
public class DashboardController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private TransactionService txService; // ✅ Service use karna best practice hai

    @GetMapping("/dashboard")
    public String showDashboard(Model model, Principal principal) {
        
        String username = principal.getName();
        
        User user = userRepo.findByUsername(username)
                            .orElseThrow(() -> new RuntimeException("User not found!"));

        // ✅ Service ke through history nikalna
        String accNum = user.getAccount().getAccountNumber();
        List<Transaction> transactions = txService.getTransactionHistory(accNum);

        model.addAttribute("user", user);
        model.addAttribute("transactions", transactions);

        return "dashboard"; 
    }
}