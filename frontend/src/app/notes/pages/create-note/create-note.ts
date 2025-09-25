import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FULL_NAVIGATION_PATHS } from '../../../shared/constants/navigation-paths';
import { Validators, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { FormUtils } from 'src/app/utils/form-utils';
import { NotesService } from '../../services/notes';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './create-note.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateNote {
  notes_list = FULL_NAVIGATION_PATHS.NOTES_LIST;

  private formBuilder = inject(FormBuilder);
  private notesService = inject(NotesService);
  private router = inject(Router);

  formUtils = FormUtils;

  myForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    content: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]],
    date: ['', [Validators.required]],
    priority: [
      '',
      [Validators.required, Validators.min(1), Validators.max(5), Validators.pattern('^[1-5]$')],
    ],
  });

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const formData = {
      ...this.myForm.value,
      priority: parseInt(this.myForm.value.priority, 10),
    };

    this.notesService.create(formData, () => {
      this.router.navigate([FULL_NAVIGATION_PATHS.NOTES_LIST]);
    });
  }
}
