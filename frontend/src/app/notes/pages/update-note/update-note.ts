import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  OnDestroy,
  effect,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FULL_NAVIGATION_PATHS } from '../../../shared/constants/navigation-paths';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from 'src/app/utils/form-utils';
import { DateFormatter } from 'src/app/utils/date-formatter';
import { Subscription } from 'rxjs';
import { NotesService } from '../../services/notes';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './update-note.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UpdateNote implements OnInit, OnDestroy {
  notes_list = FULL_NAVIGATION_PATHS.NOTES_LIST;

  private notesService = inject(NotesService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private dateFormatter = DateFormatter;
  formUtils = FormUtils;

  note = this.notesService.note;
  noteLoading = this.notesService.loading;
  noteError = this.notesService.error;

  private routeSubscription?: Subscription;

  ngOnInit(): void {
    this.loadNoteFromRoute();

    this.routeSubscription = this.route.params.subscribe((params) => {
      const noteId = params['id'];

      if (noteId) {
        this.notesService.clearNote();
        this.notesService.findById(+noteId);
      }
    });
  }

  private loadNoteFromRoute(): void {
    const noteId = this.route.snapshot.params['id'];

    if (noteId) {
      this.notesService.findById(+noteId);
    }
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  myForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    content: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]],
    date: ['', [Validators.required]],
    priority: [
      '',
      [Validators.required, Validators.min(1), Validators.max(5), Validators.pattern('^[1-5]$')],
    ],
  });

  constructor() {
    effect(() => {
      const currentNote = this.note();
      if (currentNote) {
        this.myForm.patchValue({
          title: currentNote.title,
          content: currentNote.content,
          date: this.dateFormatter.toDateInput(currentNote.date),
          priority: currentNote.priority.toString(),
        });
      }
    });

    effect(() => {
      const error = this.noteError();
      if (error) {
        this.router.navigate([FULL_NAVIGATION_PATHS.NOT_FOUND]);
      }
    });
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
  }
}
