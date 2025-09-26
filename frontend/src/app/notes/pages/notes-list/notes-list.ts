import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet, NavigationEnd } from '@angular/router';
import { FULL_NAVIGATION_PATHS } from '../../../shared/constants/navigation-paths';
import { NotesService } from '../../services/notes';
import { DateFormatter } from 'src/app/utils/date-formatter';
import { filter } from 'rxjs/operators';

@Component({
  imports: [RouterOutlet, RouterLink],
  templateUrl: './notes-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Notes implements OnInit {
  navigationPaths = FULL_NAVIGATION_PATHS;

  notesService = inject(NotesService);
  router = inject(Router);
  currentRoute = signal<string>('');
  dateFormatter = DateFormatter;

  ngOnInit(): void {
    this.notesService.findAll();

    // Inicializar la ruta actual
    this.currentRoute.set(this.router.url);

    // Suscribirse a los cambios de ruta
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute.set(event.url);
      });
  }

  deleteNote(id: number) {
    this.notesService.delete(id);
  }
}
