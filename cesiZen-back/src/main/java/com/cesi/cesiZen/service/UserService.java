package com.cesi.cesiZen.service;

import java.util.List;

import com.cesi.cesiZen.dto.AdminUserDTO;
import com.cesi.cesiZen.dto.UserDTO;
import com.cesi.cesiZen.dto.UserResponseAdminDTO;
import com.cesi.cesiZen.dto.UserUpdateProfileDTO;
import com.cesi.cesiZen.entity.User;

public interface UserService {

    User create(UserDTO dto);

    List<User> findAll();

    User findById(Long id);

    User save(User user);

    void delete(Long id);

    User partialUpdate(Long id, UserUpdateProfileDTO dto);

    void updatePassword(Long id, String password);

    User createUserWithRole(AdminUserDTO dto);

    User adminUpdateUser(Long id, AdminUserDTO dto);

    List<UserResponseAdminDTO> getAllUsersWithRoles();
}
