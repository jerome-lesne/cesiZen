package com.cesi.cesiZen.service;

import java.util.List;

import com.cesi.cesiZen.dto.BreathExerciseDTO;
import com.cesi.cesiZen.dto.BreathHistoryDTO;

public interface BreathService {
    void createBreathExercise(BreathExerciseDTO dto);

    List<BreathExerciseDTO> getAllBreathExercise();

    void updateBreathExercise(Long id, BreathExerciseDTO dto);

    void deleteBreathExercise(Long id);

    void addToBreathHistory(Long id_user, Long id_ex);

    List<BreathHistoryDTO> getBreathHistoryForUser(Long id);
}
