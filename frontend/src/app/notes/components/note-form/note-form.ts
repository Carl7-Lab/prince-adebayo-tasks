import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormUtils } from 'src/app/utils/form-utils';

@Component({
  selector: 'note-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './note-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteFormComponent {
  form = input.required<FormGroup>();
  pageTitle = input.required<string>();
  pageSubtitle = input.required<string>();
  submitButtonText = input.required<string>();
  cancelRoute = input.required<string>();

  formSubmit = output<void>();

  formUtils = FormUtils;

  onSubmit() {
    this.formSubmit.emit();
  }
}
