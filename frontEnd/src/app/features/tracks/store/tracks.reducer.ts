import {createReducer , on} from '@ngrx/store'
// import {Track} from  '../../../modules/track/track-module'
import {Track} from '../../../modules/track/track-module'

import * as TrackActions from './tracks.actions'

export interface TrackState{
  tracks :Track[];
  loading :boolean;
  isSaving:boolean,
  error :string | null;
  isDeleting:boolean;
}

export  const initialState :TrackState = {
  tracks : [],
  loading:false,
  isSaving:false,
  isDeleting:false,
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
  })),
  on(TrackActions.deleteTrack,(state,{id}) =>({
    ...state,
    isDeleting:true
    })),
  on(TrackActions.deleteTrackSuccess,(state ,{id}) =>({
    ...state,
    tracks:state.tracks.filter(track=>track.id !== id),
    isDeleting:false
    })),
  on(TrackActions.deleteTrackFailed,(state,{error})=>({
        ...state,
      error:error,
    isDeleting:false
  })),

  // update reducers

  on(TrackActions.updateTrack, (state) => ({
    ...state,
    isSaving: true
  })),

  on(TrackActions.updateTrackSuccess, (state, { track }) => ({
    ...state,
    tracks: state.tracks.map(t => t.id === track.id ? track : t),
    isSaving: false
  })),

  on(TrackActions.updateTrackFailure, (state, { error }) => ({
    ...state,
    error: error,
    isSaving: false
  }))


)

