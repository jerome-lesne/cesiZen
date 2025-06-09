package com.cesi.cesiZen.entity;

import java.util.List;
import jakarta.persistence.*;

@Entity
@Table(name = "role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private String name;
    @Column
    private String description;

    public Role() {
    }

    public Role(String name, String description) {
        this.name = name;
        this.description = description;
    }

    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserRole> userRoles;

}
