import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FULL_NAVIGATION_PATHS } from '../../../shared/constants/navigation-paths';
import { FormGroup } from '@angular/forms';
import { NotesService } from '../../services/notes';
import { NoteFormService } from '../../services/note-form.service';
import { NoteFormComponent } from '../../components/note-form/note-form';

@Component({
  imports: [NoteFormComponent],
  template: `
    <note-form
      [form]="myForm"
      [pageTitle]="'Create Royal Decree'"
      [pageSubtitle]="'Issue a new royal decree for your kingdom'"
      [submitButtonText]="'Issue Royal Decree'"
      [isSubmitBlocked]="isSubmitBlocked()"
      [cancelRoute]="notes_list"
      (formSubmit)="onSubmit()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateNote {
  notes_list = FULL_NAVIGATION_PATHS.NOTES_LIST;

  private notesService = inject(NotesService);
  private noteFormService = inject(NoteFormService);

  isSubmitBlocked = signal(false);

  myForm: FormGroup = this.noteFormService.createForm();

  onSubmit() {
    if (this.isSubmitBlocked()) {
      return;
    }

    this.noteFormService.onSubmit(this.myForm, (formData) => {
      this.notesService.create(formData, () => {
        this.noteFormService.navigateToNotesList();
      });
    });
  }
}
