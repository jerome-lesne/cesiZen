package com.cesi.cesiZen.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cesi.cesiZen.dto.UserDTO;
import com.cesi.cesiZen.entity.User;
import com.cesi.cesiZen.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create")
    @Operation(summary = "Create a new user", description = "Creates and returns a new User")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserDTO dto) {
        try {
            User user = userService.create(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/")
    @Operation(summary = "Get all users", description = "Returns a list of all users")
    public List<User> findAll() {
        List<User> usersList = userService.findAll();
        return usersList;
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get user by id", description = "Ruturns a User")
    public User findById(@PathVariable Long id) {
        User user = userService.findById(id);
        return user;
    }

    @PutMapping("/{id}")
    @Operation(summary = "Edit user by id", description = "Edit a User")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @Valid @RequestBody UserDTO dto) {
        try {
            User user = userService.update(id, dto);
            return ResponseEntity.ok(user);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", ex.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
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
