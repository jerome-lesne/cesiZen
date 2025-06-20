package com.cesi.cesiZen.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cesi.cesiZen.dto.AdminUserDTO;
import com.cesi.cesiZen.entity.User;
import com.cesi.cesiZen.service.UserService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/admin/users")
public class AdminUserController {

    private final UserService userService;

    public AdminUserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create")
    @Operation(summary = "As admin create a new user")
    public ResponseEntity<?> createUser(@RequestBody AdminUserDTO dto) {
        try {
            User created = userService.createUserWithRole(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "As admin delete user")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/update/{id}")
    @Operation(summary = "As admin update user")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody AdminUserDTO dto) {
        try {
            User updated = userService.adminUpdateUser(id, dto);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsersWithRoles());
    }
}
