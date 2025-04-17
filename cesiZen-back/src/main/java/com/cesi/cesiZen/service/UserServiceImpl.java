package com.cesi.cesiZen.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import com.cesi.cesiZen.entity.User;
import com.cesi.cesiZen.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
    UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findById(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        User user = null;
        if (optionalUser.isPresent()) {
            user = optionalUser.get();
        } else {
            throw new RuntimeException("Employee not found for id : " + id);
        }
        return user;
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

}
