package com.musicstreanv2.streaming.repository;

import com.musicstreanv2.streaming.modul.Track;
import jdk.jfr.Registered;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TrackRepository extends JpaRepository<Track,Long> {



}
