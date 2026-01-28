package com.musicstreanv2.streaming.service.serviceImpl;

import com.musicstreanv2.streaming.dto.TrackRequestDto;
import com.musicstreanv2.streaming.dto.TrackResponseDto;
import com.musicstreanv2.streaming.mapper.TrackMapper;
import com.musicstreanv2.streaming.modul.Track;
import com.musicstreanv2.streaming.repository.TrackRepository;
import com.musicstreanv2.streaming.service.serviceInterface.TrackService;
import jakarta.transaction.Transactional;
import lombok.Data;
import org.apache.logging.log4j.CloseableThreadContext;
import org.jaudiotagger.audio.AudioFile;
import org.jaudiotagger.audio.AudioFileIO;
import org.jaudiotagger.audio.AudioHeader;
import org.jaudiotagger.audio.exceptions.CannotReadException;
import org.jaudiotagger.audio.exceptions.InvalidAudioFrameException;
import org.jaudiotagger.audio.exceptions.ReadOnlyFileException;
import org.jaudiotagger.tag.TagException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Instant;

@Service
public class  TrackInterfaceImpl  implements TrackService {

    private final TrackRepository trackRepository;
    private final TrackMapper trackMapper;

    public TrackInterfaceImpl(TrackRepository trackRepository,TrackMapper trackMapper){
        this.trackRepository =trackRepository;
        this.trackMapper =trackMapper;
    }
        @Transactional
    public TrackResponseDto addTrack(TrackRequestDto requestDto){
//        Track  track = trackMapper.toEntity(requestDto);
            try{
                String savedPath = saveFile(requestDto.getFile());
                File mp3File = new File(savedPath);
                double duration = audioDuration(mp3File);
                Track track = trackMapper.toEntity(requestDto);
                track.setDuration(duration);
                track.setFilePath(savedPath);
                track.setAddedAt(Instant.now());

                Track savedTrack = trackRepository.save(track);
                return trackMapper.toDto(savedTrack);

            }   catch (IOException e) {
                throw new IllegalStateException("Failed to save uploaded file", e);
            }




    }


    @Transactional
    public double audioDuration(File file){
        try{
            AudioFile audioFile = AudioFileIO.read(file);
            AudioHeader audioHeader = audioFile.getAudioHeader();
            double durationInSeconds =audioHeader.getTrackLength();
            return durationInSeconds;
        }catch (CannotReadException | IOException | TagException
                | ReadOnlyFileException | InvalidAudioFrameException e) {
            throw new IllegalArgumentException("Invalid or unreadable MP3 file", e);
        }

    }

    @Transactional
    public String saveFile(MultipartFile file) throws IOException{

        String filePath = System.getProperty("user.dir")+"/uploads/";
        File fileDirectory = new File(filePath);

        if(!fileDirectory.exists()) fileDirectory.mkdir();

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        Path path = Paths.get(filePath +fileName);

        Files.copy(file.getInputStream(),path, StandardCopyOption.REPLACE_EXISTING);
         return path.toString();


    }


}
