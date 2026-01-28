    package com.musicstreanv2.streaming.modul;

    import com.musicstreanv2.streaming.enums.Category;
    import jakarta.persistence.*;
    import lombok.Data;
    import lombok.Generated;

    import java.io.File;
    import java.time.Instant;
    import java.util.Date;
    @Data
    @Entity
    public class Track {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private long id;
        private String title;
        private String artist;
        private String description;
        @Enumerated(EnumType.STRING)
        private Category category;
        private double duration;
        private Instant addedAt;
        private String filePath ;


    }
