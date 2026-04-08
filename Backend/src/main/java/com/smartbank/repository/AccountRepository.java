package com.smartbank.repository;

import com.smartbank.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    // ✅ Yeh method name aur parameter dhyan se dekhiye
    Optional<Account> findByAccountNumber(String accountNumber);
}