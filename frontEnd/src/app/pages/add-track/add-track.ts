import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as TrackActions from '../../features/tracks/store/tracks.actions';
import { Track } from '../../modules/track/track-module';
import { Button } from '../../shared/components/button/button';
import {TrackService} from '../../services/track-service'

@Component({
  selector: 'app-add-track',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Button],
  templateUrl: './add-track.html',
  styleUrl: './add-track.css',
})
export class AddTrack {
  private fb = inject(FormBuilder);
  private store = inject(Store);
   trackService =  inject(TrackService);

  @Output() closeForm = new EventEmitter<void>();
  @Input() trackToEdit: Track | null = null;

  // properties needed by your HTML
  trackForm: FormGroup;
  isSubmitting = false;
  submissionError: string | null = null;
  fileError: string | null = null;
  selectedFile: File | null = null;

  constructor() {
    this.trackForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      artist: ['', [Validators.required]],
      category: ['pop', [Validators.required]],
      description: ['', [Validators.maxLength(200)]]
    });
  }

  onClose() {
    this.closeForm.emit();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('File selected:', file.name);
    }
  }

  onSubmit() {
    if (this.trackForm.invalid || !this.selectedFile) return;

    this.isSubmitting = true;
    const v = this.trackForm.value;

    const newTrack: Track = {
      title: v.title,
      artist: v.artist,
      category: v.category,
      description: v.description ?? '',
      file: this.selectedFile,
      duration: '0:00',
      addedAt: new Date(),
    };

    // Dispatch the action instead of calling service directly
    this.store.dispatch(TrackActions.addTrack({ track: newTrack }));

    // Reset form and close modal after dispatch
    this.isSubmitting = false;
    this.trackForm.reset();
    this.onClose(); // or handle this in the effect's success callback
  }
}
