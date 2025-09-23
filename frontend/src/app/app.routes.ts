import { Routes } from '@angular/router';
import { NAVIGATION_PATHS } from './shared/constants/navigation-paths';

export const routes: Routes = [
  {
    path: '',
    redirectTo: NAVIGATION_PATHS.NOTES,
    pathMatch: 'full',
  },
  {
    path: NAVIGATION_PATHS.NOTES,
    loadComponent: () => import('./notes/pages/notes-list/notes-list'),
    children: [
      {
        path: NAVIGATION_PATHS.NOTES_CREATE,
        loadComponent: () => import('./notes/pages/create-note/create-note'),
      },
      {
        path: NAVIGATION_PATHS.NOTES_UPDATE,
        loadComponent: () => import('./notes/pages/update-note/update-note'),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./not-found/not-found'),
  },
];
