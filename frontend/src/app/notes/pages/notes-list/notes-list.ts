import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FULL_NAVIGATION_PATHS } from '../../../shared/constants/navigation-paths';
import { NotesService } from '../../services/notes';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './notes-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Notes {
  navigationPaths = FULL_NAVIGATION_PATHS;

  notesService = inject(NotesService);
}
