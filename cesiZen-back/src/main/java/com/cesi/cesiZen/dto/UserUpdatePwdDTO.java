package com.cesi.cesiZen.dto;

import jakarta.validation.constraints.*;

public class UserUpdatePwdDTO {
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\w\\s]).{12,}$", message = "Password must be at least 12 characters long, with at least one lowercase letter, one uppercase letter, one digit, and one special character")
    private String password;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
