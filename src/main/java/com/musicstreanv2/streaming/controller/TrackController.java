    package com.musicstreanv2.streaming.controller;

    import com.musicstreanv2.streaming.dto.TrackRequestDto;
    import com.musicstreanv2.streaming.dto.TrackResponseDto;
    import com.musicstreanv2.streaming.service.serviceInterface.TrackService;
    import org.jaudiotagger.tag.id3.framebody.FrameBodyTRCK;
    import org.springframework.http.MediaType;
    import org.springframework.http.ResponseEntity;
    import org.springframework.stereotype.Controller;
    import org.springframework.web.bind.annotation.*;

    @RestController
    @RequestMapping("/api/track")
    public class TrackController {

        private final TrackService trackService;

        public TrackController(TrackService trackService) {
            this.trackService = trackService;
        }

        @PostMapping(value = "/addTrack", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
        public ResponseEntity<TrackResponseDto> addTrack(@ModelAttribute TrackRequestDto dto) {
            return ResponseEntity.ok(trackService.addTrack(dto));
        }
        @DeleteMapping("/deleteTrack/{id}")
        public ResponseEntity<String> deleteTrack(@PathVariable long id){
            trackService.deleteTrack(id);
            return ResponseEntity.ok("The Track Has been Deleted");
        }

    }

