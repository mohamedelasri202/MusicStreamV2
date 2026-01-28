package com.musicstreanv2.streaming.mapper;

import com.musicstreanv2.streaming.dto.TrackRequestDto;
import com.musicstreanv2.streaming.dto.TrackResponseDto;
import com.musicstreanv2.streaming.modul.Track;
import com.musicstreanv2.streaming.repository.TrackRepository;
import org.springframework.stereotype.Component;

@Component
public class  TrackMapper {

    public static Track toEntity (TrackRequestDto dto){
        Track track = new Track();
        track.setTitle(dto.getTitle());
        track.setArtist(dto.getArtist());
        track.setFilePath(dto.getFilePath());
        track.setDescription(dto.getDescription());
        return  track;
    }

    public static TrackResponseDto toDto(Track entity){
        TrackResponseDto dto = new TrackResponseDto();
        dto.setArtist(entity.getArtist());
        dto.setDescription(entity.getDescription());
        dto.setCategory(entity.getCategory());
        dto.setTitle(entity.getTitle());
        dto.setAddedAt(entity.getAddedAt());
        return  dto;

    }



}
