package com.cesi.cesiZen.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_breath_exercise")
public class UserBreathExercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "breath_id")
    private BreathExercise breathExercise;

    public UserBreathExercise() {
    }

    public UserBreathExercise(User user, BreathExercise breathExercise) {
        this.user = user;
        this.breathExercise = breathExercise;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public BreathExercise getBreathExercise() {
        return breathExercise;
    }

    public void setBreathExercise(BreathExercise breathExercise) {
        this.breathExercise = breathExercise;
    }
}
