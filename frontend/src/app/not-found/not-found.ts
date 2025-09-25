import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FULL_NAVIGATION_PATHS } from '../shared/constants/navigation-paths';

@Component({
  imports: [RouterLink],
  templateUrl: './not-found.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NotFound {
  navigationPaths = FULL_NAVIGATION_PATHS;
}
