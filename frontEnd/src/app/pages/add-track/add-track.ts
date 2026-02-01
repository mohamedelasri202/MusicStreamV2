import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as TrackActions from '../../features/tracks/store/tracks.actions';
import { Track } from '../../modules/track/track-module';
import { Button } from '../../shared/components/button/button';
import { TrackService } from '../../services/track-service'
import { Component, EventEmitter, Input, Output, inject, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-add-track',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Button],
  templateUrl: './add-track.html',
  styleUrl: './add-track.css',
})
export class AddTrack implements OnChanges {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  trackService = inject(TrackService);

  @Output() closeForm = new EventEmitter<void>();
  @Input() trackToEdit: Track | null = null;

  // --- ADD THESE MISSING PROPERTIES ---
  submissionError: string | null = null;
  fileError: string | null = null;
  isSubmitting = false; // Missing property from error
  selectedFile: File | null = null; // Missing property used in onSubmit
  // -------------------------------------

  trackForm: FormGroup;

  constructor() {
    this.trackForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      artist: ['', [Validators.required]],
      category: ['pop', [Validators.required]],
      description: ['', [Validators.maxLength(200)]]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['trackToEdit'] && this.trackToEdit) {
      this.trackForm.patchValue({
        title: this.trackToEdit.title,
        artist: this.trackToEdit.artist,
        category: this.trackToEdit.category,
        description: this.trackToEdit.description
      });
    } else if (changes['trackToEdit'] && !this.trackToEdit) {
      this.trackForm.reset({ category: 'pop' });
    }
  }

  // --- ADD THIS MISSING METHOD ---
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if (this.trackForm.valid) {
      this.isSubmitting = true;
      const formValue = this.trackForm.value;

      const trackData: Track = {
        ...formValue,
        id: this.trackToEdit ? this.trackToEdit.id : undefined,
        addedAt: this.trackToEdit ? this.trackToEdit.addedAt : new Date(),
        duration: this.trackToEdit ? this.trackToEdit.duration : '0:00',
        file: this.selectedFile || undefined, // Changed: only use selectedFile, or undefined
      };

      if (this.trackToEdit && this.trackToEdit.id) {
        this.store.dispatch(TrackActions.updateTrack({ track: trackData }));
      } else {
        this.store.dispatch(TrackActions.addTrack({ track: trackData }));
      }
      this.onClose();
    }
  }
  onClose() {
    this.isSubmitting = false;
    this.selectedFile = null;
    this.closeForm.emit();
  }
}
