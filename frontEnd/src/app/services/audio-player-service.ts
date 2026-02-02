import { inject, Injectable, NgZone, signal } from '@angular/core';
import { Track } from '../modules/track/track-module';
import { StorageService } from './storage-service';
import { toArray } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AudioPlayerService {

  private zone = inject(NgZone)
  private storage = inject(StorageService)
  public audio  = new Audio;
  state = signal<'playing'|'paused'|'buffering'|'stopped'>('stopped');
  currentTrack = signal<Track | null>(null);
  volume = signal <number>(0.5);
  progress = signal <number>(0);
  private playlist: Track[] = [];

  constructor(){

this.audio.addEventListener('timeupdate', () => {
  this.zone.run(() => {
    const current = this.audio.currentTime;
    const total = this.audio.duration;

    if (total > 0) {

      const percentage = (current / total) * 100;
      this.progress.set(percentage);
    }
  });
});

    this.audio.addEventListener('playing', () => {
  this.zone.run(() => {
    console.log("Audio is officially PLAYING");
    this.state.set('playing');
  });
});
    this.audio.addEventListener('pause',()=>this.state.set('paused'))
    this.audio.addEventListener('waiting',()=>this.state.set('buffering'))
    this.audio.addEventListener('ended', () => {
      this.zone.run(async () => {
        console.log("Song ended, moving to next...");
        const current = this.currentTrack();
        if (current) {
          await this.goToNext();
        } else {
          this.state.set('stopped');
        }
      });
    })
  }

  setPlaylist(tracks: Track[]) {
    this.playlist = tracks;
    console.log("Playlist updated in service! Total songs:", this.playlist.length);
  }


  loadTrack(track: Track) {
    this.currentTrack.set(track);

    if (track.file instanceof Blob) {
      const url = URL.createObjectURL(track.file);
      this.audio.src = url;
    }

    else {

      this.audio.src = `http://localhost:8080/api/track/stream/${track.id}`;
    }

    this.audio.load();
    this.play();
  }

  play() {
  if (this.currentTrack()) {
    this.audio.play();
    this.state.set('playing');
    console.log("State set to playing");
  }
}

  pause() {
  this.audio.pause();
  this.state.set('paused');
  console.log("State set to paused");
}

  setVolume(value: number) {

  this.volume.set(value);


  this.audio.volume = value / 100;
}


  async goToNext() {
    const current = this.currentTrack();
    if (!current || this.playlist.length === 0) return;


    const currentIndex = this.playlist.findIndex(t => String(t.id) === String(current.id));


    const nextIndex = (currentIndex + 1) % this.playlist.length;

    this.loadTrack(this.playlist[nextIndex]);
  }


  async goBack() {
    const current = this.currentTrack();
    if (!current || this.playlist.length === 0) return;

    const currentIndex = this.playlist.findIndex(t => String(t.id) === String(current.id));


    const prevIndex = (currentIndex - 1 + this.playlist.length) % this.playlist.length;

    this.loadTrack(this.playlist[prevIndex]);
  }
  formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return '0:00';

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);


  return `${mins}:${secs.toString().padStart(2, '0')}`;
}



}
