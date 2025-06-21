package com.cesi.cesiZen.service;

import java.util.List;

import com.cesi.cesiZen.dto.BreathExerciseDTO;

public interface BreathService {
    void createBreathExercise(BreathExerciseDTO dto);

    List<BreathExerciseDTO> getAllBreathExercise();

    void updateBreathExercise(Long id, BreathExerciseDTO dto);

    void deleteBreathExercise(Long id);
}
