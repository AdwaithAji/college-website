package com.example.college.common;

import org.springframework.core.io.Resource;

public record ImageDataDto(
    Resource resource,
    String imageType
) {

}
