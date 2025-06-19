package com.cesi.cesiZen.repository;

import com.cesi.cesiZen.entity.Role;
import com.cesi.cesiZen.entity.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(String name);

}
