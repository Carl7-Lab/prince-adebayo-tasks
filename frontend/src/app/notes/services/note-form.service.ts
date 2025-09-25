import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DateFormatter } from '../../utils/date-formatter';
import { FULL_NAVIGATION_PATHS } from '../../shared/constants/navigation-paths';
import { Note } from '../interfaces/notes';

@Injectable({
  providedIn: 'root',
})
export class NoteFormService {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  createForm(): FormGroup {
    return this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      content: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]],
      date: ['', [Validators.required]],
      priority: [
        '',
        [Validators.required, Validators.min(1), Validators.max(5), Validators.pattern('^[1-5]$')],
      ],
    });
  }

  patchFormWithNote(form: FormGroup, note: any): void {
    if (note) {
      form.patchValue({
        title: note.title,
        content: note.content,
        date: DateFormatter.toDateInput(note.date),
        priority: note.priority.toString(),
      });
    }
  }

  onSubmit(form: FormGroup, submitCallback: (formData: Note) => void): void {
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    const formData = {
      ...form.value,
      priority: parseInt(form.value.priority, 10),
    };

    submitCallback(formData);
  }

  navigateToNotesList(): void {
    this.router.navigate([FULL_NAVIGATION_PATHS.NOTES_LIST]);
  }

  navigateToNotFound(): void {
    this.router.navigate([FULL_NAVIGATION_PATHS.NOT_FOUND]);
  }
}
