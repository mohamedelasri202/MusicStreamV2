import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TrackActions from '../../features/tracks/store/tracks.actions';
import * as TrackSelectors from '../../features/tracks/store/tracks.selectors';
import {CommonModule} from '@angular/common'
import { Observable } from 'rxjs';  // ← ADD THIS
import { Track } from '../../modules/track/track-module';


@Component({
  selector: 'app-library',
  imports: [CommonModule],
  standalone:true ,
  templateUrl: './library.html',
  styleUrl: './library.css',
})
export class Library  implements  OnInit{
  tracks$!: Observable<Track[]>;


  constructor(private store:Store) {
    this.tracks$ =this.store.select(TrackSelectors.selectAllTracks)
  }

  ngOnInit():void{
    this.store.dispatch(TrackActions.loadTracks() )
  }



}



