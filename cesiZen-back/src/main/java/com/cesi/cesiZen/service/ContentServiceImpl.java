package com.cesi.cesiZen.service;

import com.cesi.cesiZen.dto.ContentDTO;
import com.cesi.cesiZen.entity.Content;
import com.cesi.cesiZen.repository.ContentRepository;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContentServiceImpl implements ContentService {

    private final ContentRepository contentRepository;

    public ContentServiceImpl(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    private ContentDTO toDTO(Content content) {
        return new ContentDTO(content.getId(), content.getTitle(), content.getContent());
    }

    @Override
    public List<ContentDTO> getAll() {
        return contentRepository.findAll(Sort.by(Sort.Direction.DESC, "id")).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ContentDTO getById(Long id) {
        Content content = contentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contenu introuvable"));
        return toDTO(content);
    }

    @Override
    public ContentDTO create(ContentDTO dto) {
        Content content = new Content(dto.title, dto.content);
        return toDTO(contentRepository.save(content));
    }

    @Override
    public ContentDTO update(Long id, ContentDTO dto) {
        Content content = contentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contenu introuvable"));

        content.setTitle(dto.title);
        content.setContent(dto.content);

        return toDTO(contentRepository.save(content));
    }

    @Override
    public void delete(Long id) {
        if (!contentRepository.existsById(id)) {
            throw new RuntimeException("Contenu introuvable");
        }
        contentRepository.deleteById(id);
    }
}
