package com.cesi.cesiZen.controller;

import com.cesi.cesiZen.dto.ContentDTO;
import com.cesi.cesiZen.service.ContentService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/content")
public class PublicContentController {

    private final ContentService contentService;

    public PublicContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping
    public ResponseEntity<List<ContentDTO>> getAll() {
        return ResponseEntity.ok(contentService.getAll());
    }

}
