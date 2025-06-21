package com.cesi.cesiZen.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cesi.cesiZen.dto.BreathExerciseDTO;
import com.cesi.cesiZen.service.BreathService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/admin/breath-exercise")
public class AdminBreathController {
    final private BreathService breathService;

    public AdminBreathController(BreathService breathService) {
        this.breathService = breathService;
    }

    @PostMapping
    @Operation(summary = "As an admin create breath exercise")
    public ResponseEntity<?> createBreathExercise(@RequestBody @Valid BreathExerciseDTO dto) {
        try {
            breathService.createBreathExercise(dto);
            return ResponseEntity.ok(HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping
    @Operation(summary = "get all breath exercises")
    public ResponseEntity<?> getAllBreathExercise() {
        return ResponseEntity.ok(breathService.getAllBreathExercise());
    }

    @PatchMapping("/update/{id}")
    @Operation(summary = "update breath exercise")
    public ResponseEntity<?> updateBreathExercise(@PathVariable Long id, @RequestBody @Valid BreathExerciseDTO dto) {
        try {
            System.out.println(dto.getInspirationDuration());
            breathService.updateBreathExercise(id, dto);
            return ResponseEntity.ok(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/delete/{id}")
    @Operation(summary = "update breath exercise")
    public ResponseEntity<?> deleteBreathExercise(@PathVariable Long id) {
        try {
            breathService.deleteBreathExercise(id);
            return ResponseEntity.ok(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

}
