package com.smartbank.controller;

import com.smartbank.entity.Transaction;
import com.smartbank.service.BankingService;
import com.smartbank.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/bank")
public class BankController {

    @Autowired
    private BankingService bankingService;
    
    @Autowired
    private AccountRepository accountRepository;

    // 1. Welcome Message
    @GetMapping("/welcome")
    public String welcome() {
        return "<h1>Welcome to Smart Bank Portal!</h1><p>Backend is working perfectly.</p>";
    }

    // 2. Transfer Money (Ab ye Service use karega)
    @PostMapping("/transfer")
    public ResponseEntity<String> transferMoney(
            @RequestParam String from, 
            @RequestParam String to, 
            @RequestParam BigDecimal amount) {
        
        // Service ko call karein. Saara logic (Debit/Credit/Balance check) wahan handle ho raha hai.
        String result = bankingService.transferMoney(from.trim(), to.trim(), amount);
        
        if (result.startsWith("Error")) {
            return ResponseEntity.status(400).body(result);
        }
        return ResponseEntity.ok(result);
    }

    // 3. Mini Statement / History
    @GetMapping("/history/{accountNumber}")
    public List<Transaction> getHistory(@PathVariable String accountNumber) {
        // Service ka naya method use kijiye
        return bankingService.getTransactionHistory(accountNumber.trim());
    }

    // 4. Check Balance
    @GetMapping("/balance/{accountNumber}")
    public ResponseEntity<Object> getBalance(@PathVariable String accountNumber) {
        return accountRepository.findByAccountNumber(accountNumber.trim())
                .map(account -> ResponseEntity.ok((Object) account.getBalance()))
                .orElse(ResponseEntity.status(404).body("Account " + accountNumber + " not found in DB"));
    }
}