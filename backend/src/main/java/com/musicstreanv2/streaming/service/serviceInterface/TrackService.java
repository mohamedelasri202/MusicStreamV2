package com.musicstreanv2.streaming.service.serviceInterface;

import com.musicstreanv2.streaming.dto.TrackRequestDto;
import com.musicstreanv2.streaming.dto.TrackResponseDto;
import com.musicstreanv2.streaming.modul.Track;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

public interface TrackService {

    TrackResponseDto addTrack(TrackRequestDto requestDto);
    double audioDuration(File file);
    String saveFile(MultipartFile file);
    void deleteTrack(long id);
    TrackResponseDto updateTrack(TrackRequestDto requestDto ,long id);
    List<Track> getAllTracks();
    Resource getTrackResource(long id) throws IOException;
}
