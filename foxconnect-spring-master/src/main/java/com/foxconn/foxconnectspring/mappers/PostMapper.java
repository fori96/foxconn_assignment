package com.foxconn.foxconnectspring.mappers;

import com.foxconn.foxconnectspring.dtos.PostDto;
import com.foxconn.foxconnectspring.entities.Post;
import org.springframework.stereotype.Component;

@Component
public class PostMapper {

    public PostDto toDTO(Post entity) {
        if (entity == null) return null;

        PostDto dto = new PostDto();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setBody(entity.getBody());
        return dto;
    }

    //TODO: write a method to convert post from DTO to entity

    public Post toEntity(PostDto dto) {
        if (dto == null) return null;

        Post entity = new Post();
        entity.setId(dto.getId());
        entity.setTitle(dto.getTitle());
        entity.setBody(dto.getBody());
        return entity;
    }
}
