package com.foxconn.foxconnectspring.services;

import com.foxconn.foxconnectspring.dtos.PostDto;
import com.foxconn.foxconnectspring.entities.Post;
import com.foxconn.foxconnectspring.mappers.PostMapper;
import com.foxconn.foxconnectspring.repositories.PostRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PostService {

    private final PostRepository postRepository;

    private final PostMapper mapper;

    public PostService(PostRepository postRepository, PostMapper mapper) {
        this.postRepository = postRepository;
        this.mapper = mapper;
    }

    public PostDto findById(UUID id) {
            Post post = postRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + id));            
            return mapper.toDTO(post);
    }

    //TODO: write the methods needed for the endpoints of the controller class

    public String createPost(PostDto post) {
        try {            
            Post postEntity = mapper.toEntity(post);
            Post postResponse = postRepository.save(postEntity);
            return postResponse.getId().toString();
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    public List<PostDto> findAll() {
        List<Post> post = postRepository.findAll();
        List<PostDto> postDtos = post.stream().map(p -> mapper.toDTO(p)).collect(Collectors.toList());
        return postDtos;
    }

    public String updatePost(UUID id,PostDto post) {
        Post existingPost = postRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + post.getId()));
        existingPost.setTitle(post.getTitle());
        existingPost.setBody(post.getBody());
        try { 
            Post savedPost = postRepository.save(existingPost);
            return mapper.toDTO(savedPost).toString();
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
