import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './notes.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Notes {}
