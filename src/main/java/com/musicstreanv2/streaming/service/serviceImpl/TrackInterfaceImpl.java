package com.musicstreanv2.streaming.service.serviceImpl;

import com.musicstreanv2.streaming.dto.TrackRequestDto;
import com.musicstreanv2.streaming.dto.TrackResponseDto;
import com.musicstreanv2.streaming.mapper.TrackMapper;
import com.musicstreanv2.streaming.modul.Track;
import com.musicstreanv2.streaming.repository.TrackRepository;
import com.musicstreanv2.streaming.service.serviceInterface.TrackService;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class  TrackInterfaceImpl  implements TrackService {

    private final TrackRepository trackRepository;
    private final TrackMapper trackMapper;

    public TrackInterfaceImpl(TrackRepository trackRepository,TrackMapper trackMapper){
        this.trackRepository =trackRepository;
        this.trackMapper =trackMapper;
    }

    public TrackResponseDto addTrack(TrackRequestDto requestDto){
        Track  track =
    }


}
