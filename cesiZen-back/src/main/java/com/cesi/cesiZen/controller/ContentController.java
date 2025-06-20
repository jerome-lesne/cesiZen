package com.cesi.cesiZen.controller;

import com.cesi.cesiZen.dto.ContentDTO;
import com.cesi.cesiZen.service.ContentService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/content")
public class ContentController {

    private final ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping
    public ResponseEntity<List<ContentDTO>> getAll() {
        return ResponseEntity.ok(contentService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContentDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(contentService.getById(id));
    }

    @PostMapping
    public ResponseEntity<ContentDTO> create(@RequestBody ContentDTO dto) {
        return ResponseEntity.ok(contentService.create(dto));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ContentDTO> update(@PathVariable Long id, @RequestBody ContentDTO dto) {
        return ResponseEntity.ok(contentService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        contentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
