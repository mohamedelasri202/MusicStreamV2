package com.musicstreanv2.streaming.service.serviceInterface;

import com.musicstreanv2.streaming.dto.TrackRequestDto;
import com.musicstreanv2.streaming.dto.TrackResponseDto;

public interface TrackService {

    TrackResponseDto addTrack(TrackRequestDto requestDto);
}
