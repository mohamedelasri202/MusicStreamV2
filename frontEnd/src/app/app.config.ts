import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
// import { trackReducer } from '/features/tracks/store/tracks.reducer';
import {trackReducer} from './features/tracks/store/tracks.reducer'
// import { TrackEffects } from '/features/tracks/store/tracks.effects';
import {TracksEffects} from './features/tracks/store/tracks.effects'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ tracks: trackReducer }),
    provideEffects([TracksEffects])
  ]
};
