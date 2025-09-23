import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FULL_NAVIGATION_PATHS } from '../../../shared/constants/navigation-paths';

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './create-note.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateNote {
  navigationPaths = FULL_NAVIGATION_PATHS;
}
