import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectAllTracks } from '../../features/tracks/store/tracks.selectors';

import * as TrackActions from '../../features/tracks/store/tracks.actions';
import * as TrackSelectors from '../../features/tracks/store/tracks.selectors';
import { AddTrack } from '../add-track/add-track'; // Your child component
import  {AudioPlayerService} from '../../services/audio-player-service'
import {Track} from '../../modules/track/track-module'
import {FilterMenu} from '../../shared/components/filter-menu/filter-menu';
// import { FilterMenu } from '../shared/components/filter-menu/filter-menu';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, AddTrack,FilterMenu],
  templateUrl: './library.html',
})
export class Library implements OnInit {
  private store = inject(Store);
  public audioService = inject(AudioPlayerService);


  private tracks$ = this.store.select(TrackSelectors.selectAllTracks);
  isDeleting = this.store.selectSignal(TrackSelectors.selectIsDeleting);
  private allTracks = this.store.selectSignal(selectAllTracks);


  isFormVisible = false;
  isFilterMenuVisible = false;
  isMenuOpen = signal(false);
  currentSort = 'Date Added';
  selectedTrack = null;
  searchQuery = signal<string>('');
  selectedCategory = signal<string>('All');
  ngOnInit(): void {

    this.store.dispatch(TrackActions.loadTracks());


    this.store.select(TrackSelectors.selectAllTracks).subscribe(tracks => {
      if (tracks && tracks.length > 0) {

        this.audioService.setPlaylist(tracks);
      }
    });
  }


  // filteredTracks = signal<any[]>([]);

  constructor() {

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
  filteredTracks = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const category = this.selectedCategory();
    const tracks = this.allTracks();

    return tracks.filter(track => {

      const matchesTitle = track.title.toLowerCase().includes(query);


      const matchesCategory = category === 'All' || track.category === category;

      return matchesTitle && matchesCategory;
    });
  });

  // Methods to update signals
  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  setCategory(cat: string) {
    this.selectedCategory.set(cat);
  }

}
