package com.cesi.cesiZen.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cesi.cesiZen.dto.AdminUserDTO;
import com.cesi.cesiZen.dto.UserDTO;
import com.cesi.cesiZen.dto.UserResponseAdminDTO;
import com.cesi.cesiZen.dto.UserUpdateProfileDTO;
import com.cesi.cesiZen.entity.Role;
import com.cesi.cesiZen.entity.User;
import com.cesi.cesiZen.entity.UserRole;
import com.cesi.cesiZen.repository.RoleRepository;
import com.cesi.cesiZen.repository.UserRepository;
import com.cesi.cesiZen.repository.UserRoleRepository;

import jakarta.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService {
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;
    RoleRepository roleRepository;
    UserRoleRepository userRoleRepository;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder,
            RoleRepository roleRepository, UserRoleRepository userRoleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
    }

    @Override
    public User create(UserDTO dto) {
        User user = new User();
        user.setFirstName(dto.getFirstName());
        user.setName(dto.getName());
        user.setBirthday(dto.getBirthday());
        user.setAddress(dto.getAddress());
        user.setZipCode(dto.getZipCode());
        user.setCity(dto.getCity());
        user.setMail(dto.getMail());
        String encodedPassword = passwordEncoder.encode(dto.getPassword());
        user.setPassword(encodedPassword);

        return userRepository.save(user);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("Employee not found for id : " + id));
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public void delete(Long id) {
        if (!userRepository.existsById(id)) {
            throw new IllegalArgumentException("User with id " + id + " not found.");
        }

        userRepository.deleteById(id);
    }

    @Override
    public User partialUpdate(Long id, UserUpdateProfileDTO dto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (dto.getName() != null)
            user.setName(dto.getName());
        if (dto.getFirstName() != null)
            user.setFirstName(dto.getFirstName());
        if (dto.getBirthday() != null)
            user.setBirthday(dto.getBirthday());
        if (dto.getAddress() != null)
            user.setAddress(dto.getAddress());
        if (dto.getZipCode() != null)
            user.setZipCode(dto.getZipCode());
        if (dto.getCity() != null)
            user.setCity(dto.getCity());
        if (dto.getMail() != null)
            user.setMail(dto.getMail());

        return userRepository.save(user);
    }

    @Override
    public void updatePassword(Long id, String newPassword) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        String encodedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(encodedPassword);
        userRepository.save(user);
    }

    @Override
    public User createUserWithRole(AdminUserDTO dto) {

        User user = new User();
        user.setName(dto.name);
        user.setFirstName(dto.firstName);
        user.setMail(dto.mail);
        user.setPassword(passwordEncoder.encode(dto.password));
        user.setAddress(dto.address);
        user.setCity(dto.city);
        user.setZipCode(dto.zipCode);
        user.setBirthday(dto.birthday);

        userRepository.save(user);

        for (String roleName : dto.getRoles()) {
            Role role = roleRepository.findByName(roleName)
                    .orElseThrow(() -> new RuntimeException("Rôle introuvable : " + roleName));

            userRoleRepository.save(new UserRole(user, role));
        }

        return user;
    }

    public List<UserResponseAdminDTO> getAllUsersWithRoles() {
        return userRepository.findAll().stream().map(user -> {
            UserResponseAdminDTO dto = new UserResponseAdminDTO();
            dto.setId(user.getId());
            dto.setFirstName(user.getFirstName());
            dto.setName(user.getName());
            dto.setMail(user.getMail());
            dto.setAddress(user.getAddress());
            dto.setCity(user.getCity());
            dto.setZipCode(user.getZipCode());
            dto.setBirthday(user.getBirthday());
            dto.setRoles(user.getUserRoles().stream()
                    .map(ur -> ur.getRole().getName())
                    .toList());
            return dto;
        }).toList();
    }

    @Transactional
    @Override
    public User adminUpdateUser(Long id, AdminUserDTO dto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        user.setName(dto.name);
        user.setFirstName(dto.firstName);
        user.setMail(dto.mail);
        user.setAddress(dto.address);
        user.setCity(dto.city);
        user.setZipCode(dto.zipCode);
        user.setBirthday(dto.birthday);
        if (dto.password != null) {
            user.setPassword(passwordEncoder.encode(dto.password));
        }

        userRepository.save(user);

        userRoleRepository.deleteByUser(user);

        for (String roleName : dto.getRoles()) {
            Role role = roleRepository.findByName(roleName)
                    .orElseThrow(() -> new RuntimeException("Role not found: " + roleName));
            userRoleRepository.save(new UserRole(user, role));
        }

        return user;
    }

}
