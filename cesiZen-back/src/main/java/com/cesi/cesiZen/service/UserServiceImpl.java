package com.cesi.cesiZen.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cesi.cesiZen.dto.UserDTO;
import com.cesi.cesiZen.dto.UserUpdateProfileDTO;
import com.cesi.cesiZen.entity.User;
import com.cesi.cesiZen.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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

}
