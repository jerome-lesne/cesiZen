package com.cesi.cesiZen.service;

import java.util.List;

import com.cesi.cesiZen.dto.UserDTO;
import com.cesi.cesiZen.entity.User;

public interface UserService {

    User create(UserDTO dto);

    List<User> findAll();

    User findById(Long id);

    User save(User user);

    User update(Long id, UserDTO dto);

    void delete(Long id);
}
