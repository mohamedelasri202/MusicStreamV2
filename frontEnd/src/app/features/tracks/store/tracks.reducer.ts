import {createReducer , on} from '@ngrx/store'
// import {Track} from  '../../../modules/track/track-module'
import {Track} from '../../../modules/track/track-module'

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
on(TrackActions.loadTracksSuccess ,(state,{tracks}) =>({
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
