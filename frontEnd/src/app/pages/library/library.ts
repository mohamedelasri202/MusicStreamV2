import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';


import * as TrackActions from '../../features/tracks/store/tracks.actions';
import * as TrackSelectors from '../../features/tracks/store/tracks.selectors';
import { AddTrack } from '../add-track/add-track'; // Your child component
import  {AudioPlayerService} from '../../services/audio-player-service'
import {Track} from '../../modules/track/track-module'
// import { FilterMenu } from '../shared/components/filter-menu/filter-menu';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, AddTrack],
  templateUrl: './library.html',
})
export class Library implements OnInit {
  private store = inject(Store);
  private audioService = inject(AudioPlayerService);


  private tracks$ = this.store.select(TrackSelectors.selectAllTracks);
  isDeleting = this.store.selectSignal(TrackSelectors.selectIsDeleting);

  // 2. UI State Signals
  isFormVisible = false;
  isMenuOpen = signal(false);
  currentSort = 'Date Added';
  selectedTrack = null;

  ngOnInit(): void {

    this.store.dispatch(TrackActions.loadTracks());


    this.store.select(TrackSelectors.selectAllTracks).subscribe(tracks => {
      if (tracks && tracks.length > 0) {

        this.audioService.setPlaylist(tracks);
      }
    });
  }


  filteredTracks = signal<any[]>([]);

  constructor() {
    this.tracks$.subscribe(t => this.filteredTracks.set(t));
  }

  togleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  toggleFilterMenu() {
    this.isMenuOpen.update(v => !v);
  }

  onSortChange(event: any) {
    this.currentSort = event;
    this.isMenuOpen.set(false);
  }


  deleteTrack(id: number) {
    this.store.dispatch(TrackActions.deleteTrack({id}));
    console.log('Delete ID:', id);
  }

  updateTrack(track: any) {
    this.selectedTrack = track;
    this.isFormVisible = true;
  }

  playTrack(track: Track) {
    console.log('Playing track:', track.title);

    this.audioService.loadTrack(track);
  }
}
