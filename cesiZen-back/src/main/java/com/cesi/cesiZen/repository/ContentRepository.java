package com.cesi.cesiZen.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cesi.cesiZen.entity.Content;

public interface ContentRepository extends JpaRepository<Content, Long> {
}
