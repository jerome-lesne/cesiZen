package com.cesi.cesiZen.service;

import java.util.List;
import com.cesi.cesiZen.entity.User;

public interface UserService {
    List<User> findAll();

    User findById(Long id);

    User save(User user);
}
