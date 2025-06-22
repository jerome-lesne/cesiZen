package com.cesi.cesiZen.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class BreathExerciseDTO {

    private Long id;

    @NotBlank(message = "Le nom de l'exercice est obligatoire")
    private String name;

    @NotBlank(message = "La durée d'inspiration est obligatoire")
    @Pattern(regexp = "\\d+", message = "La durée d'inspiration doit contenir uniquement des chiffres")
    private String inspirationDuration;

    @NotBlank(message = "La durée d'apnée est obligatoire")
    @Pattern(regexp = "\\d+", message = "La durée d'apnée doit contenir uniquement des chiffres")
    private String apneaDuration;

    @NotBlank(message = "La durée d'expiration est obligatoire")
    @Pattern(regexp = "\\d+", message = "La durée d'expiration doit contenir uniquement des chiffres")
    private String expirationDuration;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInspirationDuration() {
        return inspirationDuration;
    }

    public void setInspirationDuration(String inspirationDuration) {
        this.inspirationDuration = inspirationDuration;
    }

    public String getApneaDuration() {
        return apneaDuration;
    }

    public void setApneaDuration(String apneaDuration) {
        this.apneaDuration = apneaDuration;
    }

    public String getExpirationDuration() {
        return expirationDuration;
    }

    public void setExpirationDuration(String expirationDuration) {
        this.expirationDuration = expirationDuration;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
