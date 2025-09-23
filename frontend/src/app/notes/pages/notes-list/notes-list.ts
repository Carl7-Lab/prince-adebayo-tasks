import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FULL_NAVIGATION_PATHS } from '../../../shared/constants/navigation-paths';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './notes-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Notes {
  navigationPaths = FULL_NAVIGATION_PATHS;

  notes = [
    {
      id: 1,
      title: 'Sample Royal Decree 1',
      content: 'This is a sample royal decree to demonstrate the styling.',
      date: '2025-01-15',
      priority: 1,
    },
    {
      id: 2,
      title: 'Sample Royal Decree 2',
      content: 'Another sample royal decree with different content.',
      date: '2025-01-16',
      priority: 2,
    },
    {
      id: 3,
      title: 'Sample Royal Decree 3',
      content: 'A third sample royal decree to show the complete layout.',
      date: '2025-01-17',
      priority: 3,
    },
  ];
}
