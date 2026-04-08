package com.smartbank.service;

import com.smartbank.entity.Loan;
import com.smartbank.repository.LoanRepository;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.math.MathContext;

@Service
public class LoanService {

    private final LoanRepository loanRepo;

    public LoanService(LoanRepository loanRepo) {
        this.loanRepo = loanRepo;
    }

    public Loan applyForLoan(Loan loan) {
        // EMI Calculation Math
        double principal = loan.getLoanAmount().doubleValue();
        double ratePerMonth = (loan.getInterestRate() / 12) / 100;
        int months = loan.getDurationMonths();

        double emi = (principal * ratePerMonth * Math.pow(1 + ratePerMonth, months)) 
                     / (Math.pow(1 + ratePerMonth, months) - 1);

        loan.setMonthlyEmi(new BigDecimal(emi, MathContext.DECIMAL32));
        loan.setStatus("PENDING");
        return loanRepo.save(loan);
    }
}