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

  addingTrack$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(TrackActions.addTrack),
      mergeMap(({track})=>this.trackService.addTrack().pipe(
        map((track:Track) =>TrackActions.addingTrackSuccess({track})),
          catchError((error)=>of(TrackActions.addingTrackFailed({error:error.message})))
      )
    )
      );
  })
}
