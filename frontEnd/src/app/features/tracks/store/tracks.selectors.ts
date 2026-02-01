import {createFeatureSelector ,createSelector} from '@ngrx/store';

import  {TrackState} from './tracks.reducer';

export  const selectTrackState = createFeatureSelector<TrackState>('tracks');

export  const selectAllTracks = createSelector(

  selectTrackState,
  (state) =>state.tracks

);

export  const selectTrackLoading = createSelector(

  selectTrackState,
  (state)=>state.loading

)
export const selectIsDeleting = createSelector(
  selectTrackState,
  (state: TrackState) => state.isDeleting
);
