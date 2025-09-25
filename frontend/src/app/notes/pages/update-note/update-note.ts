import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  OnDestroy,
  effect,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FULL_NAVIGATION_PATHS } from '../../../shared/constants/navigation-paths';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotesService } from '../../services/notes';
import { NoteFormService } from '../../services/note-form.service';
import { NoteFormComponent } from '../../components/note-form/note-form';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  imports: [NoteFormComponent],
  template: `
    <note-form
      [form]="myForm"
      [pageTitle]="'Update Royal Decree'"
      [pageSubtitle]="'Update a royal decree for your kingdom'"
      [submitButtonText]="'Update Royal Decree'"
      [cancelRoute]="notes_list"
      [isSubmitBlocked]="isSubmitBlocked()"
      (formSubmit)="onSubmit()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UpdateNote implements OnInit, OnDestroy {
  notes_list = FULL_NAVIGATION_PATHS.NOTES_LIST;

  private notesService = inject(NotesService);
  private noteFormService = inject(NoteFormService);
  private toastService = inject(ToastService);
  private route = inject(ActivatedRoute);

  note = this.notesService.note;
  noteError = this.notesService.error;
  noteId: number | null = null;

  isSubmitBlocked = signal(false);

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
    if (this.isSubmitBlocked()) {
      return;
    }

    this.noteFormService.onSubmit(this.myForm, (formData) => {
      this.notesService.update(+this.noteId!, formData, () => {
        if (
          formData.title.toLowerCase() === formData.title.toLowerCase().split('').reverse().join('')
        ) {
          this.toastService.showAlert('The Palindrome Curse', 'Proceeding with deletion');
          setTimeout(() => {
            this.notesService.delete(+this.noteId!, () => {
              this.noteFormService.navigateToNotesList();
            });
          }, 2000);
        } else {
          this.noteFormService.navigateToNotesList();
        }
      });
    });
  }
}
