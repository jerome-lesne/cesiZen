package com.cesi.cesiZen.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cesi.cesiZen.service.BreathService;

import io.swagger.v3.oas.annotations.Operation;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/breath-exercise")
public class BreathController {
    final private BreathService breathService;

    public BreathController(BreathService breathService) {
        this.breathService = breathService;
    }

    @GetMapping
    @Operation(summary = "get all breath exercises")
    public ResponseEntity<?> getAllBreathExercise() {
        return ResponseEntity.ok(breathService.getAllBreathExercise());
    }

}
