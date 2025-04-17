package com.cesi.cesiZen.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.cesi.cesiZen.entity.User;
import com.cesi.cesiZen.service.UserService;

@RestController
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> findAll() {
        List<User> usersList = userService.findAll();
        return usersList;
    }

    @GetMapping("/users/{id}")
    public User findById(@PathVariable Long id) {
        User user = userService.findById(id);
        return user;
    }

}
