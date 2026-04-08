package com.smartbank.service;

import com.smartbank.entity.Account;
import com.smartbank.entity.Transaction;
import com.smartbank.repository.AccountRepository;
import com.smartbank.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BankingService {

    private final AccountRepository accountRepo;
    private final TransactionRepository txRepo;

    public BankingService(AccountRepository accountRepo, TransactionRepository txRepo) {
        this.accountRepo = accountRepo;
        this.txRepo = txRepo;
    }

    @Transactional
    public String transferMoney(String fromAccNum, String toAccNum, BigDecimal amount) {
        Optional<Account> fromOpt = accountRepo.findByAccountNumber(fromAccNum);
        Optional<Account> toOpt = accountRepo.findByAccountNumber(toAccNum);

        if (fromOpt.isEmpty() || toOpt.isEmpty()) {
            return "Error: One or both accounts not found!";
        }

        Account fromAcc = fromOpt.get();
        Account toAcc = toOpt.get();

        if (fromAcc.getBalance().compareTo(amount) < 0) {
            return "Error: Insufficient balance!";
        }

        // Update Balances
        fromAcc.setBalance(fromAcc.getBalance().subtract(amount));
        toAcc.setBalance(toAcc.getBalance().add(amount));
        accountRepo.save(fromAcc);
        accountRepo.save(toAcc);

        // 1. Sender Entry (DEBIT)
        Transaction debitTx = new Transaction();
        debitTx.setFromAccount(fromAccNum);
        debitTx.setToAccount(toAccNum);
        debitTx.setAmount(amount);
        debitTx.setType("DEBIT");
        debitTx.setDescription("Transfer to " + toAccNum);
        debitTx.setTimestamp(LocalDateTime.now());
        txRepo.save(debitTx);

        // 2. Receiver Entry (CREDIT)
        Transaction creditTx = new Transaction();
        creditTx.setFromAccount(fromAccNum);
        creditTx.setToAccount(toAccNum);
        creditTx.setAmount(amount);
        creditTx.setType("CREDIT");
        creditTx.setDescription("Received from " + fromAccNum);
        creditTx.setTimestamp(LocalDateTime.now());
        txRepo.save(creditTx);

        return "Success: Transfer completed!";
    }

    // History fetch karne ka method
 // ✅ Ye method BankingService ke andar hona chahiye
    public List<Transaction> getTransactionHistory(String accountNumber) {
        // Ye line aapke TransactionRepository se data fetch karegi
        return txRepo.findByFromAccountOrToAccountOrderByTimestampDesc(accountNumber, accountNumber);
    }
}