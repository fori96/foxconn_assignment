package com.foxconn.foxconnectspring.restcontrollers;

import com.foxconn.foxconnectspring.dtos.PostDto;
import com.foxconn.foxconnectspring.services.PostService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/posts")
public class PostRestController {

    private final PostService postService;

    public PostRestController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/{id}")
    public PostDto getPost(@PathVariable UUID id) {
        return postService.findById(id);
    }

    //TODO: write a method to create a post

    @PostMapping("/")
    public String createPost(@RequestBody PostDto post) {
        return postService.createPost(post);
    }

    //TODO: write a method that returns a list of all posts

    @GetMapping
    public List<PostDto> getAllPost() {
        return postService.findAll();
    }

    //TODO: Write a method to update a post by ID (@PatchMapping)

    @PatchMapping("/{id}")
    public String updatePost(@PathVariable UUID id, @RequestBody PostDto post) {
        return postService.updatePost(id,post);
    }

    
}
