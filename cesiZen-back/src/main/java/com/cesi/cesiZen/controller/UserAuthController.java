package com.cesi.cesiZen.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cesi.cesiZen.dto.UserDTO;
import com.cesi.cesiZen.dto.UserUpdateProfileDTO;
import com.cesi.cesiZen.dto.UserUpdatePwdDTO;
import com.cesi.cesiZen.entity.User;
import com.cesi.cesiZen.repository.UserRepository;
import com.cesi.cesiZen.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/user-auth")
public class UserAuthController {
    private UserService userService;
    private UserRepository userRepository;

    public UserAuthController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PatchMapping("/update-profile")
    @Operation(summary = "Partially update user profile")
    public ResponseEntity<?> partialUpdate(
            Authentication authentication,
            @RequestBody UserUpdateProfileDTO dto) {
        String email = (String) authentication.getName();
        System.out.println(email);
        User user = userRepository.findByMail(email).orElseThrow();
        try {
            User updated = userService.partialUpdate(user.getId(), dto);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PatchMapping("/update-password")
    @Operation(summary = "Update user password")
    public ResponseEntity<?> updatePassword(
            @PathVariable Long id,
            @Valid @RequestBody UserUpdatePwdDTO dto) {
        try {
            userService.updatePassword(id, dto.getPassword());
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/delete")
    @Operation(summary = "Delete User by id", description = "Delete a User")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            userService.delete(id);
            return ResponseEntity.ok().body("User deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
