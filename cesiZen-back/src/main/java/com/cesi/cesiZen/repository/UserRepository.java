package com.cesi.cesiZen.repository;

import com.cesi.cesiZen.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
