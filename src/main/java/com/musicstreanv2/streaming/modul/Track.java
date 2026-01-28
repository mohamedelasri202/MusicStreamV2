package com.musicstreanv2.streaming.modul;

import com.musicstreanv2.streaming.enums.Category;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.io.File;
import java.util.Date;
@Data
@Entity
public class Track {

    @Id
    private long id;
    private String title;
    private String artist;
    private String description;
    private Category category;
    private double duration;
    private Date addedAt;
    private String filePath ;


}
