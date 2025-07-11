package com.foxconn.foxconnectspring.repositories;

import com.foxconn.foxconnectspring.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID> {
}
