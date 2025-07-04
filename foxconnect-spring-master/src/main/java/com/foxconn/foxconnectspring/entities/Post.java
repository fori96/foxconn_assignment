package com.foxconn.foxconnectspring.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Table(name = "t_posts")
@Data
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "title", nullable = true, length = 50)
    private String title;

    @Column(name = "body", nullable = true, length = 2000)
    private String body;
}
