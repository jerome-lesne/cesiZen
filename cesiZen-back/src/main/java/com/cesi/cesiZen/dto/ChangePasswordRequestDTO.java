package com.cesi.cesiZen.dto;

import jakarta.validation.constraints.Pattern;

public class ChangePasswordRequestDTO {
    private String oldPassword;

    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\w\\s]).{12,}$", message = "Password must be at least 12 characters long, with at least one lowercase letter, one uppercase letter, one digit, and one special character")
    private String newPassword;

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
