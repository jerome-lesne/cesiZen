package com.cesi.cesiZen.mapper;

import com.cesi.cesiZen.dto.UserResponseAdminDTO;
import com.cesi.cesiZen.entity.User;

import java.util.stream.Collectors;

public class UserMapper {

    public static UserResponseAdminDTO toAdminResponseDTO(User user) {
        UserResponseAdminDTO dto = new UserResponseAdminDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setFirstName(user.getFirstName());
        dto.setMail(user.getMail());
        dto.setAddress(user.getAddress());
        dto.setCity(user.getCity());
        dto.setZipCode(user.getZipCode());
        dto.setBirthday(user.getBirthday());

        if (user.getUserRoles() != null) {
            dto.setRoles(
                    user.getUserRoles().stream()
                            .map(userRole -> userRole.getRole().getName())
                            .collect(Collectors.toList()));
        }

        return dto;
    }
}
