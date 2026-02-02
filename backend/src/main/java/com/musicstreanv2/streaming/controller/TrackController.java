    package com.musicstreanv2.streaming.controller;

    import com.musicstreanv2.streaming.dto.TrackRequestDto;
    import com.musicstreanv2.streaming.dto.TrackResponseDto;
    import com.musicstreanv2.streaming.modul.Track;
    import com.musicstreanv2.streaming.service.serviceInterface.TrackService;
    import org.springframework.core.io.Resource;

    import org.springframework.http.HttpHeaders;
    import org.springframework.http.MediaType;
    import org.springframework.http.ResponseEntity;

    import org.springframework.web.bind.annotation.*;

    import java.io.IOException;
    import java.util.List;

    @RestController
    @RequestMapping("/api/track")
    @CrossOrigin(
            origins = "http://localhost:4200",
            methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS},
            allowedHeaders = "*")
    public class TrackController {

        private final TrackService trackService;

        public TrackController(TrackService trackService) {
            this.trackService = trackService;
        }

        @PostMapping(value = "/addTrack", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
        public ResponseEntity<TrackResponseDto> addTrack(@ModelAttribute TrackRequestDto dto) {
            return ResponseEntity.ok(trackService.addTrack(dto));
        }

        @PutMapping(value = "/updateTrack/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
        public ResponseEntity<TrackResponseDto> updateTrack(
                @PathVariable long id,
                @ModelAttribute TrackRequestDto dto
        ) {
            return ResponseEntity.ok(trackService.updateTrack(dto, id));
        }
        @DeleteMapping("/deleteTrack/{id}")
        public ResponseEntity<Void> deleteTrack(@PathVariable long id) {
            trackService.deleteTrack(id);
            return ResponseEntity.noContent().build(); // Returns 204 No Content
        }
        @GetMapping("/tracks")
       public ResponseEntity<List<Track>>getAllTracks(){

            return ResponseEntity.ok(trackService.getAllTracks());

        }
        @GetMapping("/stream/{id}")
        public ResponseEntity<Resource> streamTrack(@PathVariable long id) throws IOException{

            Resource resource = trackService.getTrackResource(id);

            return ResponseEntity.ok()

                    .contentType(MediaType.parseMediaType("audio/mpeg"))

                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        }
    }

