import { Injectable, signal } from '@angular/core';
import {Track} from '../modules/track/track-module'
// import { StorageService } from './storage-service';
import {HttpClient } from '@angular/common/http'
import {Observable } from 'rxjs'


@Injectable({
  providedIn: 'root',
})
export class TrackService {

  private apiUrl ='http://localhost:8080/api/track';
  //
  // private trackSignal = signal<Track[]>([])
  //
  //     tracks = this.trackSignal.asReadonly();
  //     status = signal<'loading'| 'error'| 'success'>('loading')
  //
  //
      constructor(private http :HttpClient) {

        }
  //
  //       private async init(){
  //       try{
  //     this.status.set('loading');
  //     const savedTracks = await this.storage.getAllTracks();
  //     this.trackSignal.set(savedTracks);
  //     this.status.set('success');
  //   }catch(error){
  //     this.status.set('error');
  //     console.error('failed to lead the tracks ', error)
  //
  //   }
  //
  // }
  //
  // async addTrack(track:Track){
  //   try{
  //     const id = await this.storage.saveTrack(track);
  //     const newTrack = { ...track, id,favorite:false};
  //     this.trackSignal.update(currentTracks=> [...currentTracks,newTrack]);
  //     return id ;
  //   }catch(error){
  //     console.error('error adding track',error);
  //     throw error
  //   }
  //
  // }
  //
  // async deleteTrack(id:number){
  //   try{
  //     await this.storage.deleteTrack(id);
  //     this.trackSignal.update(currentTracks => currentTracks.filter(track=>track.id != id));
  //   }catch(error){
  //     console.log('the track was not deleted',error)
  //   }
  // }
  //
  //   async updateTrack(track: Track) {
  //      try {
  //
  //     await this.storage.updateTrack(track);
  //
  //       this.trackSignal.update(all =>
  //         all.map(t => t.id === track.id ? track : t)
  //       );
  //     } catch (e) {
  //       console.error("Update failed", e);
  //     }
  //   }

  addTrack(track: Track): Observable<Track> {
    return this.http.post<Track>(
      `${this.apiUrl}/addTrack`,
      this.toFormData(track)
    );
  }

  private toFormData(track: Track): FormData {
    const formData = new FormData();

    formData.append('title', track.title);
    formData.append('artist', track.artist);
    formData.append('category', track.category);
    formData.append('description', track.description ?? '');
    formData.append('file', track.file); // or 'audioFile' if DTO uses that

    return formData;
  }

  getTracks(): Observable<Track[]> {
    return this.http.get<Track[]>(`${this.apiUrl}/tracks`);
  }



}
