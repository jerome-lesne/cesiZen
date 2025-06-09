package com.cesi.cesiZen.dto;

import java.time.LocalDate;
import org.springframework.format.annotation.DateTimeFormat;
import jakarta.validation.constraints.*;

public class UserDTO {
    @NotBlank(message = "User name required")
    private String name;

    @NotBlank(message = "User first name required")
    private String firstName;

    @Past(message = "Birthday must be in the past")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthday;

    @NotBlank(message = "Adress is required")
    private String address;

    @Pattern(regexp = "^\\d{5}$", message = "Zip code must be exactly 5 digits")
    private int zipCode;

    @NotBlank(message = "City is required")
    private String city;

    @Email(message = "invalid email format")
    private String mail;

    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\w\\s]).{12,}$", message = "Password must be at least 12 characters long, with at least one lowercase letter, one uppercase letter, one digit, and one special character")
    private String password;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getZipCode() {
        return zipCode;
    }

    public void setZipCode(int zipCode) {
        this.zipCode = zipCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
