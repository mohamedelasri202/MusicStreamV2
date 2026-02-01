import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

// Update these paths to match your actual folder structure
import * as TrackActions from '../../features/tracks/store/tracks.actions';
import * as TrackSelectors from '../../features/tracks/store/tracks.selectors';
import { AddTrack } from '../add-track/add-track'; // Your child component
// import { FilterMenu } from '../shared/components/filter-menu/filter-menu';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, AddTrack],
  templateUrl: './library.html',
})
export class Library implements OnInit {
  private store = inject(Store);

  // 1. Data Source from Store
  // We use a Signal to match your HTML usage: filteredTracks()
  private tracks$ = this.store.select(TrackSelectors.selectAllTracks);
  isDeleting = this.store.selectSignal(TrackSelectors.selectIsDeleting);

  // 2. UI State Signals
  isFormVisible = false;
  isMenuOpen = signal(false);
  currentSort = 'Date Added';
  selectedTrack = null;

  ngOnInit(): void {
    // 3. Trigger the load
    this.store.dispatch(TrackActions.loadTracks());
  }

  // This matches the @for loop in your HTML
  filteredTracks = signal<any[]>([]);

  constructor() {
    // Sync the store data to our local signal
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

  playTrack(track: any) {
    console.log('Playing:', track.title);
  }
}
