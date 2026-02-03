package com.musicstreanv2.streaming.services;

import com.musicstreanv2.streaming.dto.TrackRequestDto;
import com.musicstreanv2.streaming.dto.TrackResponseDto;
import com.musicstreanv2.streaming.modul.Track;
import com.musicstreanv2.streaming.mapper.TrackMapper;
import com.musicstreanv2.streaming.repository.TrackRepository;
import com.musicstreanv2.streaming.service.serviceImpl.TrackInterfaceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TrackServiceTest {

    @Mock
    private TrackRepository trackRepository;

    @Mock
    private TrackMapper trackMapper;

    @InjectMocks
    @Spy
    private TrackInterfaceImpl trackService;

    @Test
    void testAddTrack() throws IOException {

        TrackRequestDto request = new TrackRequestDto();
        request.setTitle("Test Song");


        MultipartFile mockFile = mock(MultipartFile.class);
        request.setFile(mockFile);

        Track trackEntity = new Track();


        doReturn("fake/path/music.mp3").when(trackService).saveFile(any());

        doReturn(180.0).when(trackService).audioDuration(any());

        when(trackMapper.toEntity(request)).thenReturn(trackEntity);
        when(trackRepository.save(any(Track.class))).thenReturn(trackEntity);
        when(trackMapper.toDto(any())).thenReturn(new TrackResponseDto());


        TrackResponseDto result = trackService.addTrack(request);


        assertNotNull(result);
        verify(trackRepository).save(any());
        verify(trackService).saveFile(any()); // Verify our "fake" method was called
    }

    @Test
    void testUpdateTrack() {

        long trackId = 1L;
        Track existingTrack = new Track();
        existingTrack.setId(trackId);
        existingTrack.setTitle("Old Title");

        TrackRequestDto updateDto = new TrackRequestDto();
        updateDto.setTitle("Updated Title");

        when(trackRepository.findById(trackId)).thenReturn(Optional.of(existingTrack));
        when(trackRepository.save(any())).thenReturn(existingTrack);
        when(trackMapper.toDto(any())).thenReturn(new TrackResponseDto());

        TrackResponseDto result = trackService.updateTrack(updateDto, trackId);


        assertEquals("Updated Title", existingTrack.getTitle());
        verify(trackRepository).save(existingTrack);
    }


    @Test
    void testDeleteTrack() {

        long trackId = 1L;
        Track track = new Track();
        when(trackRepository.findById(trackId)).thenReturn(Optional.of(track));


        trackService.deleteTrack(trackId);


        verify(trackRepository, times(1)).delete(track);
    }

    @Test
    void testDeleteTrack_NotFound() {

        when(trackRepository.findById(1L)).thenReturn(Optional.empty());


        assertThrows(RuntimeException.class, () -> trackService.deleteTrack(1L));
    }
}