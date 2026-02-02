import { Component, inject, computed, OnInit, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store'; // 1. Import Store
import { selectAllTracks } from '../../features/tracks/store/tracks.selectors'; // 2. Import your selectors
import { UiService } from '../../services/ui-service';
import { CommonModule } from '@angular/common';
import { Track } from '../../modules/track/track-module';

@Component({
  selector: 'app-track-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-detail.html',
  styleUrl: './track-detail.css',
})
export class TrackDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private uiService = inject(UiService);
  private store = inject(Store); // 3. Inject the Store

  // 4. Create a signal from the store selector
  private allTracks = this.store.selectSignal(selectAllTracks);

  ngOnInit() {
    this.uiService.setSearchVisibility(false);
  }

  // 5. Use the signal we created above to find the track
  track = computed(() => {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) return null;

    const id = Number(idParam);
    const tracks = this.allTracks(); // Get the current tracks from the store signal

    // Explicitly type 't' as Track to fix the second error
    return tracks.find((t: Track) => t.id === id);
  });
}
