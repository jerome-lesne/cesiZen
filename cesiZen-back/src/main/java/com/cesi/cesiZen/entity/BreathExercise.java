package com.cesi.cesiZen.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "breath_exercise")
public class BreathExercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private String name;

    @Column
    private String InspirationDuration;

    @Column
    private String apneaDuration;

    @Column
    private String ExpirationDuration;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInspirationDuration() {
        return InspirationDuration;
    }

    public void setInspirationDuration(String inspirationDuration) {
        InspirationDuration = inspirationDuration;
    }

    public String getApneaDuration() {
        return apneaDuration;
    }

    public void setApneaDuration(String apneaDuration) {
        this.apneaDuration = apneaDuration;
    }

    public String getExpirationDuration() {
        return ExpirationDuration;
    }

    public void setExpirationDuration(String expirationDuration) {
        ExpirationDuration = expirationDuration;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
