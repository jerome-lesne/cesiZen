package com.cesi.cesiZen.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.cesi.cesiZen.dto.BreathExerciseDTO;
import com.cesi.cesiZen.entity.BreathExercise;
import com.cesi.cesiZen.repository.BreathExerciseRepository;

@Service
public class BreathServiceImpl implements BreathService {
    BreathExerciseRepository breathExerciseRepository;

    public BreathServiceImpl(BreathExerciseRepository breathExerciseRepository) {
        this.breathExerciseRepository = breathExerciseRepository;
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
}
