package com.cesi.cesiZen.repository;

import com.cesi.cesiZen.entity.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    @EntityGraph(attributePaths = { "userRoles", "userRoles.role" })
    Optional<User> findByMail(String mail);
}
