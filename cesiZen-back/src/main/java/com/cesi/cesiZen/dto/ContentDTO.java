package com.cesi.cesiZen.dto;

public class ContentDTO {
    public Long id;
    public String title;
    public String content;

    public ContentDTO() {
    }

    public ContentDTO(Long id, String title, String content) {
        this.id = id;
        this.title = title;
        this.content = content;
    }
}
