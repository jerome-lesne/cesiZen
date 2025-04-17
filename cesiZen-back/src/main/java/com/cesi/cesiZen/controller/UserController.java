package com.cesi.cesiZen.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.cesi.cesiZen.entity.User;
import com.cesi.cesiZen.service.UserService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    @Operation(summary = "Get all users", description = "Returns a list of all users")
    public List<User> findAll() {
        List<User> usersList = userService.findAll();
        return usersList;
    }

    @GetMapping("/users/{id}")
    @Operation(summary = "Get user by id", description = "Ruturns a User")
    public User findById(@PathVariable Long id) {
        User user = userService.findById(id);
        return user;
    }

}
