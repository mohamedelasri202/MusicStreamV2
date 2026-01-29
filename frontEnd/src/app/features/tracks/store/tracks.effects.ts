import {Injectable } from '@angular/core'
import {Actions, createEffect ,ofType} from '@ngrx/effects';
import {of} from 'rxjs'
import {map ,mergeMap ,catchError} from 'rxjs/operators'
import * as TrackActions from 'tracks.actions'
import {TrackService } from '../../../services/track-service';

@Injectable()
export  class  TracksEffects{
  private actions$:Actions
  private trackService:TrackService
}{}
