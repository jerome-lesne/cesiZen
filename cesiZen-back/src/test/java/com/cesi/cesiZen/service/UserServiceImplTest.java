package com.cesi.cesiZen.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.util.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import com.cesi.cesiZen.dto.*;
import com.cesi.cesiZen.entity.*;
import com.cesi.cesiZen.repository.*;

import org.springframework.security.crypto.password.PasswordEncoder;

public class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private RoleRepository roleRepository;
    @Mock
    private UserRoleRepository userRoleRepository;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateUser() {
        UserDTO dto = new UserDTO();
        dto.setName("Doe");
        dto.setFirstName("John");
        dto.setCity("Coudoux");
        dto.setZipCode(13111);
        dto.setAddress("1 rue test");
        dto.setMail("john@doe.fr");
        dto.setBirthday(LocalDate.of(1990, 1, 1));
        dto.setPassword("Password123!");

        when(passwordEncoder.encode(dto.getPassword())).thenReturn("encodedPwd");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        User created = userService.create(dto);

        assertEquals("Doe", created.getName());
        assertEquals("encodedPwd", created.getPassword());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testFindAllUsers() {
        List<User> users = List.of(new User(), new User());
        when(userRepository.findAll()).thenReturn(users);
        assertEquals(2, userService.findAll().size());
    }

    @Test
    void testFindById_UserFound() {
        User user = new User();
        user.setId(1L);
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        assertEquals(1L, userService.findById(1L).getId());
    }

    @Test
    void testFindById_UserNotFound() {
        when(userRepository.findById(anyLong())).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> userService.findById(42L));
    }

    @Test
    void testDelete_UserExists() {
        when(userRepository.existsById(1L)).thenReturn(true);
        userService.delete(1L);
        verify(userRepository).deleteById(1L);
    }

    @Test
    void testDelete_UserNotExists() {
        when(userRepository.existsById(1L)).thenReturn(false);
        assertThrows(IllegalArgumentException.class, () -> userService.delete(1L));
    }

    @Test
    void testUpdatePassword() {
        User user = new User();
        user.setId(1L);
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(passwordEncoder.encode("newSecurePwd123!")).thenReturn("encodedPwd");

        userService.updatePassword(1L, "newSecurePwd123!");

        assertEquals("encodedPwd", user.getPassword());
        verify(userRepository).save(user);
    }

    @Test
    void testCreateUserWithRole() {
        AdminUserDTO dto = new AdminUserDTO();
        dto.setName("Admin");
        dto.setFirstName("Root");
        dto.setMail("root@admin.fr");
        dto.setPassword("P@ssw0rd123");
        dto.setAddress("1 root way");
        dto.setCity("Paris");
        dto.setZipCode(75001);
        dto.setBirthday(LocalDate.of(1980, 5, 5));
        dto.setRoles(List.of("ADMIN"));

        Role adminRole = new Role();
        adminRole.setName("ADMIN");

        when(roleRepository.findByName("ADMIN")).thenReturn(Optional.of(adminRole));
        when(passwordEncoder.encode(dto.getPassword())).thenReturn("encodedPwd");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        User result = userService.createUserWithRole(dto);

        assertEquals("Admin", result.getName());
        verify(userRoleRepository).save(any(UserRole.class));
    }
}
