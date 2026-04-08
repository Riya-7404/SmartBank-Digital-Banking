package com.smartbank.service;

import com.smartbank.entity.Account;
import com.smartbank.entity.Transaction;
import com.smartbank.repository.AccountRepository;
import com.smartbank.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private AccountRepository accountRepo;

    @Autowired
    private TransactionRepository transactionRepo;

    @Transactional(rollbackFor = Exception.class)
    public void transferMoney(String fromAcc, String toAcc, BigDecimal amount) throws Exception {
        
        Account sender = accountRepo.findByAccountNumber(fromAcc)
                .orElseThrow(() -> new Exception("Sender Account not found!"));
        Account receiver = accountRepo.findByAccountNumber(toAcc)
                .orElseThrow(() -> new Exception("Receiver Account not found!"));

        if (sender.getBalance().compareTo(amount) < 0) {
            throw new Exception("Insufficient Balance!");
        }

        sender.setBalance(sender.getBalance().subtract(amount));
        receiver.setBalance(receiver.getBalance().add(amount));

        accountRepo.save(sender);
        accountRepo.save(receiver);

        // ✅ Save Transaction Record
        Transaction tx = new Transaction();
        tx.setFromAccount(fromAcc);
        tx.setToAccount(toAcc);
        tx.setAmount(amount);
        tx.setType("TRANSFER");
        tx.setDescription("Transfer to " + toAcc);
        tx.setTimestamp(LocalDateTime.now());

        transactionRepo.save(tx);
    }

    public List<Transaction> getTransactionHistory(String accNum) {
        // ✅ Repository ka naya method use ho raha hai
        return transactionRepo.findByFromAccountOrToAccountOrderByTimestampDesc(accNum, accNum);
    }
}