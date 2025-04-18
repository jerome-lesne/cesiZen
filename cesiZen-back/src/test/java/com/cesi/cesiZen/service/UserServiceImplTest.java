package com.cesi.cesiZen.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.cesi.cesiZen.entity.User;
import com.cesi.cesiZen.repository.UserRepository;

class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindAll_UsersExists() {
        // Given
        ArrayList<User> users = new ArrayList<>();
        User user1 = new User();
        user1.setId(1L);
        user1.setName("user1");

        User user2 = new User();
        user2.setId(2L);
        user2.setName("user2");

        users.add(user1);
        users.add(user2);

        when(userRepository.findAll()).thenReturn(users);

        // When
        List<User> foundUsers = userService.findAll();

        // Then
        assertNotNull(foundUsers);
        assertEquals(users.get(0).getId(), foundUsers.get(0).getId());
        assertEquals("user1", foundUsers.get(0).getName());
        assertEquals("user2", foundUsers.get(1).getName());

    }

    @Test
    void testFindById_UserExists() {
        // Given
        Long userId = 1L;
        User mockUser = new User();
        mockUser.setId(userId);
        mockUser.setName("John Doe");

        when(userRepository.findById(userId)).thenReturn(Optional.of(mockUser));

        // When
        User foundUser = userService.findById(userId);

        // Then
        assertNotNull(foundUser);
        assertEquals(userId, foundUser.getId());
        assertEquals("John Doe", foundUser.getName());

        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    void testFindById_UserNotFound() {
        // Given
        Long userId = 99L;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // When & Then
        Exception exception = assertThrows(RuntimeException.class, () -> {
            userService.findById(userId);
        });

        assertEquals("Employee not found for id : " + userId, exception.getMessage());

        verify(userRepository, times(1)).findById(userId);
    }
}
