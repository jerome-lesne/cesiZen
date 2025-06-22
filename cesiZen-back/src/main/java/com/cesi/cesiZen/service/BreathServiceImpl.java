package com.cesi.cesiZen.service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.cesi.cesiZen.dto.BreathExerciseDTO;
import com.cesi.cesiZen.dto.BreathHistoryDTO;
import com.cesi.cesiZen.entity.BreathExercise;
import com.cesi.cesiZen.repository.BreathExerciseRepository;
import com.cesi.cesiZen.repository.UserBreathExerciseRepository;
import com.cesi.cesiZen.repository.UserRepository;
import com.cesi.cesiZen.entity.User;
import com.cesi.cesiZen.entity.UserBreathExercise;

@Service
public class BreathServiceImpl implements BreathService {
    BreathExerciseRepository breathExerciseRepository;
    UserBreathExerciseRepository userBreathExerciseRepository;
    UserRepository userRepository;

    public BreathServiceImpl(BreathExerciseRepository breathExerciseRepository,
            UserBreathExerciseRepository userBreathExerciseRepository, UserRepository userRepository) {
        this.breathExerciseRepository = breathExerciseRepository;
        this.userBreathExerciseRepository = userBreathExerciseRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void createBreathExercise(BreathExerciseDTO dto) {
        BreathExercise breathExercise = new BreathExercise();

        breathExercise.setName(dto.getName());
        breathExercise.setInspirationDuration(dto.getInspirationDuration());
        breathExercise.setApneaDuration(dto.getApneaDuration());
        breathExercise.setExpirationDuration(dto.getExpirationDuration());

        breathExerciseRepository.save(breathExercise);
    }

    @Override
    public List<BreathExerciseDTO> getAllBreathExercise() {
        return breathExerciseRepository.findAll(Sort.by(Sort.Direction.DESC, "id")).stream().map(breath -> {
            BreathExerciseDTO dto = new BreathExerciseDTO();
            dto.setId(breath.getId());
            dto.setName(breath.getName());
            dto.setInspirationDuration(breath.getInspirationDuration());
            dto.setApneaDuration(breath.getApneaDuration());
            dto.setExpirationDuration(breath.getExpirationDuration());
            return dto;
        }).toList();
    }

    @Override
    public void updateBreathExercise(Long id, BreathExerciseDTO dto) {
        BreathExercise breathExercise = breathExerciseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exercice de respiration non trouvé"));
        if (dto.getName() != null) {
            breathExercise.setName(dto.getName());
        }
        if (dto.getInspirationDuration() != null) {
            breathExercise.setInspirationDuration(dto.getInspirationDuration());
        }
        if (dto.getApneaDuration() != null) {
            breathExercise.setApneaDuration(dto.getApneaDuration());
        }
        if (dto.getExpirationDuration() != null) {
            breathExercise.setExpirationDuration(dto.getExpirationDuration());
        }
        breathExerciseRepository.save(breathExercise);
    }

    @Override
    public void deleteBreathExercise(Long id) {
        if (!breathExerciseRepository.existsById(id)) {
            throw new IllegalArgumentException("Breath with id " + id + " not found.");
        }
        breathExerciseRepository.deleteById(id);
    }

    @Override
    public void addToBreathHistory(Long id_user, Long id_ex) {
        UserBreathExercise userBreathExercise = new UserBreathExercise();
        User user = userRepository.findById(id_user).orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        BreathExercise breathExercise = breathExerciseRepository.findById(id_ex)
                .orElseThrow(() -> new RuntimeException("Exercice de respiration non trouvé"));
        LocalDateTime now = LocalDateTime.now();

        userBreathExercise.setUser(user);
        userBreathExercise.setBreathExercise(breathExercise);
        userBreathExercise.setDate(now);

        userBreathExerciseRepository.save(userBreathExercise);
    }

    @Override
    public List<BreathHistoryDTO> getBreathHistoryForUser(Long id) {
        return userBreathExerciseRepository.findHistoryByUserId(id);
    }
}
