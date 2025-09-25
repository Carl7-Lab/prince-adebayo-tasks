import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  OnDestroy,
  effect,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FULL_NAVIGATION_PATHS } from '../../../shared/constants/navigation-paths';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotesService } from '../../services/notes';
import { NoteFormService } from '../../services/note-form.service';
import { NoteFormComponent } from '../../components/note-form/note-form';

@Component({
  imports: [NoteFormComponent],
  template: `
    <note-form
      [form]="myForm"
      [pageTitle]="'Update Royal Decree'"
      [pageSubtitle]="'Update a royal decree for your kingdom'"
      [submitButtonText]="'Update Royal Decree'"
      [cancelRoute]="notes_list"
      (formSubmit)="onSubmit()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UpdateNote implements OnInit, OnDestroy {
  notes_list = FULL_NAVIGATION_PATHS.NOTES_LIST;

  private notesService = inject(NotesService);
  private noteFormService = inject(NoteFormService);
  private route = inject(ActivatedRoute);

  note = this.notesService.note;
  noteError = this.notesService.error;
  noteId: number | null = null;

  private routeSubscription?: Subscription;

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.noteId = params['id'];

      if (this.noteId) {
        this.notesService.clearNote();
        this.notesService.findById(+this.noteId);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  myForm: FormGroup = this.noteFormService.createForm();

  constructor() {
    effect(() => {
      const currentNote = this.note();
      if (currentNote) {
        this.noteFormService.patchFormWithNote(this.myForm, currentNote);
      }
    });

    effect(() => {
      const error = this.noteError();
      if (error) {
        this.noteFormService.navigateToNotFound();
      }
    });
  }

  onSubmit() {
    this.noteFormService.onSubmit(this.myForm, (formData) => {
      if (this.noteId) {
        this.notesService.update(+this.noteId, formData);
        this.noteFormService.navigateToNotesList();
      }
    });
  }
}
