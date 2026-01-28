package com.musicstreanv2.streaming.dto;


import com.musicstreanv2.streaming.enums.Category;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.File;

@Data
@Getter
@Setter
public class TrackRequestDto {
    private  String title;
    private String artist;
    private String description;
    private Category category;
    private String  filePath;


}
