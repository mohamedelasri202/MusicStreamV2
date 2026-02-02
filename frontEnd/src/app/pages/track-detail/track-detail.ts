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
  private store = inject(Store);


  private allTracks = this.store.selectSignal(selectAllTracks);

  ngOnInit() {
    this.uiService.setSearchVisibility(false);
  }


  track = computed(() => {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) return null;

    const id = Number(idParam);
    const tracks = this.allTracks();


    return tracks.find((t: Track) => t.id === id);
  });
}
