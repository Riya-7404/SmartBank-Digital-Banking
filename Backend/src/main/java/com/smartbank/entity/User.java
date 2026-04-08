package com.smartbank.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.Data;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String username;
    private String password;
    private String fullName;

    // 1. One-to-One Link (Mapped by 'user' in Account class)
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Account account;

    // 2. MANUAL SETTER (Agar Lombok kaam nahi kar raha)
    public void setAccount(Account account) {
        this.account = account;
    }

    public Account getAccount() {
        return account;
    }
    
    // Baaki fields ke getters/setters bhi check karein...
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
    
}