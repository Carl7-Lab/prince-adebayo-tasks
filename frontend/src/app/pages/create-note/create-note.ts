import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './create-note.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateNote {}
