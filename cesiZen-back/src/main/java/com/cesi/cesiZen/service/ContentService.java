package com.cesi.cesiZen.service;

import com.cesi.cesiZen.dto.ContentDTO;
import java.util.List;

public interface ContentService {
    List<ContentDTO> getAll();

    ContentDTO getById(Long id);

    ContentDTO create(ContentDTO dto);

    ContentDTO update(Long id, ContentDTO dto);

    void delete(Long id);
}
