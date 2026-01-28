package com.musicstreanv2.streaming.dto;

import com.musicstreanv2.streaming.enums.Category;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.File;
import java.time.LocalDateTime;
import java.util.Date;
@Data
@Getter
@Setter
public class TrackResponseDto {

    private long id ;
    private String title;
    private String artist;
    private String description;
    private Category category;
    private double duration;
    private Date addedAt;
    private File file;
}
