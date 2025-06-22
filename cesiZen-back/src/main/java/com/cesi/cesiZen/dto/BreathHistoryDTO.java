package com.cesi.cesiZen.dto;

import java.time.LocalDateTime;

public class BreathHistoryDTO {
    private LocalDateTime date;
    private String name;

    public BreathHistoryDTO(LocalDateTime date, String name) {
        this.date = date;
        this.name = name;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
