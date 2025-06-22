package com.cesi.cesiZen.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cesi.cesiZen.entity.UserBreathExercise;

public interface UserBreathExerciseRepository extends JpaRepository<UserBreathExercise, Long> {
    @Query("SELECT new com.cesi.cesiZen.dto.BreathHistoryDTO(ube.date, ube.breathExercise.name) " +
            "FROM UserBreathExercise ube " +
            "WHERE ube.user.id = :userId " +
            "ORDER BY ube.date DESC")
    List<com.cesi.cesiZen.dto.BreathHistoryDTO> findHistoryByUserId(Long userId);
}
