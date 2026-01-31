import {createReducer , on} from '@ngrx/store'
// import {Track} from  '../../../modules/track/track-module'
import {Track} from '../../../modules/track/track-module'

import * as TrackActions from './tracks.actions'

export interface TrackState{
  tracks :Track[];
  loading :boolean;
  isSaving:false,
  error :string | null;
}

export  const initialState :TrackState = {
  tracks : [],
  loading:false,
  isSaving:false,
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
  })),



// the reducer for adding a track


    on (TrackActions.addTrack ,(state,{track}) =>({
      ...state,
      isSaving:true,
      error:null

    })),
  on (TrackActions.addingTrackSuccess ,(state ,{track})=>({
  ...state,
  tracks:[...state.tracks,track],
  isSaving:false
})),
  on(TrackActions.addingTrackFailed ,(state,{error})=>({
    ...state,
    error,
    isSaving:false
  }))


)

