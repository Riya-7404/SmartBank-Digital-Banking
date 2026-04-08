package com.smartbank.repository;

import com.smartbank.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    // 🔍 Is naam ko exact copy karein (Same as Service)
    List<Transaction> findByFromAccountOrToAccountOrderByTimestampDesc(String fromAcc, String toAcc);
}