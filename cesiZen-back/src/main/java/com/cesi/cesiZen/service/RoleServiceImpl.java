package com.cesi.cesiZen.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cesi.cesiZen.dto.RoleDTO;
import com.cesi.cesiZen.entity.Role;
import com.cesi.cesiZen.repository.RoleRepository;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    private RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public List<RoleDTO> getAllRoles() {
        List<Role> roles = roleRepository.findAll();
        return roles.stream().map(role -> {
            RoleDTO dto = new RoleDTO();
            dto.setId(role.getId());
            dto.setName(role.getName());
            dto.setDescription(role.getDescription());
            return dto;
        }).toList();
    }

}
