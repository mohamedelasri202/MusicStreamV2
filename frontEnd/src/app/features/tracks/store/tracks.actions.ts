import {createAction,props} from '@ngrx/store'
import {Track} from  '../../../modules/track'

export  const loadTracks  = createAction('[Track list] load Tracks');
export  const loadTrackSuccess = createAction('[Track Api ] load Success',
  props<{tracks:Track[]}>());

export const loadTrackFailure  = createAction('[]')

