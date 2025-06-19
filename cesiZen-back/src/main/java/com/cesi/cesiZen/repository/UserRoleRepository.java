package com.cesi.cesiZen.repository;

import com.cesi.cesiZen.entity.User;
import com.cesi.cesiZen.entity.UserRole;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {

    void deleteByUser(User user);

}
