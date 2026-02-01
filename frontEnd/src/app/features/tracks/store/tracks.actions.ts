import {createAction,props} from '@ngrx/store'
// import { Track } from '../../../modules/track/track-module';
import {Track} from '../../../modules/track/track-module'

export  const loadTracks  = createAction('[Track list] load Tracks');

export  const loadTracksSuccess = createAction('[Track Api ] load Success',
  props<{tracks:Track[]}>());

export const loadTrackFailure  = createAction('[Track Api] load failed',
  props<{error :any}>()
)

// add track actions

export const addTrack = createAction('[ Track from] add track',
  props<{track:Track}>());
export  const addingTrackSuccess =createAction ('[Track Api] adding track success' ,
  props<{track:Track}>());
export const addingTrackFailed = createAction('[Track api] adding track failed ',
  props<{error:any}>());

// delete track actions
export  const deleteTrack = createAction('[Track list] delete track',
  props<{id:number}>());

 export  const deleteTrackSuccess = createAction('[Track Api] delete Track success',
   props<{id:number}>());

 export  const deleteTrackFailed = createAction('[Track Api] delete Track failed',
   props<{error:any}>());

// update actions

export const updateTrack = createAction(
  '[Track List] Update Track',
  props<{ track: Track }>()
);

export const updateTrackSuccess = createAction(
  '[Track API] Update Track Success',
  props<{ track: Track }>()
);

export const updateTrackFailure = createAction(
  '[Track API] Update Track Failure',
  props<{ error: string }>()
);
