import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './notes-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Notes {}
