import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FULL_NAVIGATION_PATHS } from '../../../shared/constants/navigation-paths';

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './update-note.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UpdateNote {
  navigationPaths = FULL_NAVIGATION_PATHS;
}
