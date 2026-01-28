package com.musicstreanv2.streaming.service.serviceInterface;

import com.musicstreanv2.streaming.dto.TrackRequestDto;
import com.musicstreanv2.streaming.dto.TrackResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

public interface TrackService {

    TrackResponseDto addTrack(TrackRequestDto requestDto);
    double audioDuration(File file);
    String saveFile(MultipartFile file);
    void deleteTrack(long id);
}
