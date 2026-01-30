import {Injectable } from '@angular/core'
import {Actions, createEffect ,ofType} from '@ngrx/effects';
import {of} from 'rxjs'
import {map ,mergeMap ,catchError} from 'rxjs/operators'
import * as TrackActions from 'tracks.actions'
import {TrackService } from '../../../services/track-service';

@Injectable()
export  class  TracksEffects{

  constructor(  private actions$:Actions,
  private trackService:TrackService) {}

}

loadTracks$= createEffect(()=>
this.actions$.pipe(
  ofType(TrackActions.loadTracks),
  mergeMap(()=>this.trackService.getTracks.pipe(
    map(tracks =>TrackActions.loadTrackSuccess({tracks})),
    catchError(error=>of(TrackActions.loadTrackFailure({error:error.message})))
  ))
)
)

