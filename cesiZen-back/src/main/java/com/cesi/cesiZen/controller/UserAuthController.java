package com.cesi.cesiZen.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cesi.cesiZen.dto.ChangePasswordRequestDTO;
import com.cesi.cesiZen.dto.UserUpdateProfileDTO;
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
    private PasswordEncoder passwordEncoder;

    public UserAuthController(UserService userService, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PatchMapping("/update-profile")
    @Operation(summary = "Partially update user profile")
    public ResponseEntity<?> partialUpdate(
            Authentication authentication,
            @Valid @RequestBody UserUpdateProfileDTO dto) {
        String email = (String) authentication.getName();
        System.out.println(email);
        User user = userRepository.findByMail(email).orElseThrow();
        try {
            userService.partialUpdate(user.getId(), dto);
            return ResponseEntity.ok(200);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/change-password")
    @Operation(summary = "Change password")
    public ResponseEntity<?> changePassword(
            @Valid @RequestBody ChangePasswordRequestDTO request,
            Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByMail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Utilisateur non trouvé"));

        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Ancien mot de passe incorrect."));
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "Mot de passe mis à jour avec succès."));
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
