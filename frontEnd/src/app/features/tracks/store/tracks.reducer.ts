import {createReducer , on} from '@ngrx/store'
import {Track} from  '../../../modules/track'

import * as TrackActions from './tracks.actions'

export interface TrackState{
  tracks :Track[];
  loading :boolean;
  error :string | null;
}

export  const initialState :TrackState = {
  tracks : [],
  loading:false,
  error:null

}
export  const trackReducer  = createReducer(initialState,

  on (TrackActions.loadTracks,state =>({
    ...state ,
    loading :true
  })),
on(TrackActions.loadTrackSuccess,(state,{tracks}) =>({
  ...state,
  tracks:tracks,
  loading :false,
  error:null
})),

  on(TrackActions.loadTrackFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))

  )
