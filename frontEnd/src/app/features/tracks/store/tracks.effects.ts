import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as TrackActions from './tracks.actions';
import { TrackService } from '../../../services/track-service';
import { Track } from '../../../modules/track/track-module';

@Injectable()
export class TracksEffects {
  private actions$ = inject(Actions);
  private trackService = inject(TrackService);

  loadTracks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrackActions.loadTracks),
      mergeMap(() =>
        this.trackService.getTracks().pipe(
          map((tracks: Track[]) => TrackActions.loadTracksSuccess({ tracks })),
          catchError((error) => of(TrackActions.loadTrackFailure({ error: error.message })))
        )
      )
    );
  });



  addingTrack$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrackActions.addTrack),
      mergeMap(({ track }) =>
        this.trackService.addTrack(track).pipe( // 👈 This calls the POST

          map((newTrack: Track) => TrackActions.addingTrackSuccess({ track: newTrack })),
          catchError((error) => of(TrackActions.addingTrackFailed({ error: error.message })))
        )
      )
    );
  });

  deleteTrack$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrackActions.deleteTrack),
      mergeMap(({ id }) =>
        this.trackService.deleteTrack(id).pipe(
          map(() => {
            console.log('✅ Delete successful, dispatching success for ID:', id);
            return TrackActions.deleteTrackSuccess({ id });
          }),
          catchError((error) => {
            console.log('❌ Delete failed:', error);
            return of(TrackActions.deleteTrackFailed({ error: error.message }));
          })
        )
      )
    );
  });
}
