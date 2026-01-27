package com.musicstreanv2.streaming.dto;

import com.musicstreanv2.streaming.enums.Category;

import java.io.File;
import java.time.LocalDateTime;
import java.util.Date;

public class TrackResponseDto {

    private long id ;
    private String title;
    private String artist;
    private String description;
    private Category category;
    private double duration;
    private LocalDateTime addedAt;
    private File file;
}
